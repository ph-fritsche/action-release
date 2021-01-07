import * as core from '@actions/core'
import semanticRelease from 'semantic-release'
import defaultConfig from './defaultConfig'
import { install } from './util/install'
import debugLib from 'debug'
import { forceRelease, initialRelease } from './plugin'
import { PluginSpec } from './semantic-release'
import { updateTags } from './util/updateTags'
import { gitConfig } from './util/gitConfig'

export default async function run(env = process.env): Promise<void> {
    try {
        const packages: string[] = ['semantic-release'] // npm warns about missing peer dependency without this

        const config = getConfig(core.getInput('config', { required: false}), defaultConfig, packages)
        const plugins: PluginSpec[] = Array.from(config.plugins ?? [])

        const dryRun = Boolean(safeParse(core.getInput('dry', { required: false })))
        const debug = Boolean(safeParse(core.getInput('debug', { required: false }))) || core.isDebug()
        const force = core.getInput('force', { required: false })

        const log = debug ? core.info : core.debug

        plugins.forEach(p => {
            const pName = typeof(p) === 'string'
                ? p
                : Array.isArray(p)
                    ? p[0]
                    : p.path
            pName && packages.push(pName)
        })

        if (config.preset) {
            packages.push('conventional-changelog-' + config.preset)
        }

        await install(packages, log)

        if (dryRun) {
            log('DRY RUN')
        }
        if (debug) {
            debugLib.enable('semantic-release:*')
        }

        plugins.push(forceRelease, initialRelease)

        const result = await semanticRelease({
            ...config,
            plugins: plugins as semanticRelease.PluginSpec[],
            dryRun,
        }, {
            env: {
                ...env,
                RELEASE_FORCE: force || env.force || '',
            },
        })

        if (result === false) {
            core.info('Release skipped')
            return
        }

        const { lastRelease, nextRelease, commits, releases } = result

        core.info('\n')
        core.info(`${nextRelease.type} release: ${lastRelease.version} -> ${nextRelease.version}`)
        core.info(` including ${commits.length} commits`)

        releases.map(r => core.info(`-> Released ${r.name} by ${r.pluginName}: ${r.url}`))

        core.setOutput('lastVersion', lastRelease.version)

        core.setOutput('type', nextRelease.type)
        core.setOutput('version', nextRelease.version)
        core.setOutput('gitTag', nextRelease.gitTag)

        const versionRegExp = /^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(?:[-](?<revision>(?:(?<revisionType>\w+)\.)?\d+))?/
        const version = nextRelease.version.match(versionRegExp)?.groups as {
            major: string,
            minor: string,
            patch: string,
            revision: string | undefined,
            revisionType: string | undefined
        }
        Object.entries(version).forEach(([k, v]) => core.setOutput(k, v ?? ''))

        core.setOutput('notes', nextRelease.notes)

        if (!dryRun) {
            const [tagPrefix] = nextRelease.gitTag.split(nextRelease.version)
            await gitConfig(env)
            const updatedTags = await updateTags('HEAD', nextRelease.version, version, tagPrefix)
            if (updatedTags.length) {
                core.info(`Updated tags: ${updatedTags.join(', ')}`)
            }
        }

    } catch(e) {
        core.setFailed(e?.message ?? e)
    }
}

function safeParse(val: string) {
    try {
        return JSON.parse(val)
    } catch (e) {
        return undefined
    }
}

function getConfig(
    configInput: string,
    defaultConfig: Partial<semanticRelease.GlobalConfig>,
    packages: string[],
): Partial<semanticRelease.GlobalConfig> {
    if (configInput[0] === '.') {
        return {
            ...defaultConfig,
            extends: configInput,
        }
    } else if (configInput[0] === '{') {
        try {
            return {
                ...defaultConfig,
                ...JSON.parse(configInput),
            }
        } catch(e) {
            throw 'Invalid inline config'
        }
    } else if (configInput !== '') {
        packages.push(configInput)
        return {
            ...defaultConfig,
            extends: configInput,
        }
    }
    return defaultConfig
}
