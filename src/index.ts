import * as core from '@actions/core'
import type SemanticRelease from 'semantic-release'
import defaultConfig from './defaultConfig'
import { install } from './util/install'
import { forceRelease, initialRelease } from './plugin'
import type { PluginSpec } from './semantic-release'
import { updateTags } from './util/updateTags'
import { gitConfig } from './util/gitConfig'

export default async function run(env = process.env): Promise<void> {
    try {
        const packages: string[] = ['semantic-release']

        const config = getConfig(core.getInput('config', { required: false}), defaultConfig, packages)
        const plugins: PluginSpec[] = Array.from(config.plugins ?? [])

        const dryRun = Boolean(safeParse(core.getInput('dry', { required: false })))
        const debug = Boolean(safeParse(core.getInput('debug', { required: false }))) || core.isDebug()
        const force = core.getInput('force', { required: false })

        const log = debug ? core.info : core.debug

        plugins.forEach(p => {
            const pDef = Array.isArray(p)
                ? p[0]
                : typeof p === 'object'
                    ? p.path
                    : p

            if (typeof pDef === 'string' && pDef !== '') {
                packages.push(pDef)
            }
        })

        if (config.preset) {
            packages.push(`conventional-changelog-${String(config.preset)}`)
        }

        await install(packages, log)

        if (dryRun) {
            log('DRY RUN')
        }
        if (debug) {
            const {default: debugLib} = await import('debug')
            debugLib.enable('semantic-release:*')
        }

        plugins.push(forceRelease, initialRelease)

        const {default: semanticRelease} = await import('semantic-release')
        const result = await semanticRelease({
            ...config,
            plugins: plugins as SemanticRelease.PluginSpec[],
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

        releases.map(r => core.info(`-> Released ${String(r.name)} by ${r.pluginName}: ${String(r.url)}`))

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
        core.setFailed(((hasProp(e, 'message') ? e.message : undefined) ?? e) as Error|string)
    }
}

function hasProp<K extends PropertyKey>(obj: unknown, key: K): obj is { [k in K]: unknown } {
    return Boolean(obj && typeof obj === 'object' && key in obj)
}

function safeParse(val: string) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return JSON.parse(val)
    } catch (e) {
        return undefined
    }
}

function getConfig(
    configInput: string,
    defaultConfig: Partial<SemanticRelease.GlobalConfig>,
    packages: string[],
): Partial<SemanticRelease.GlobalConfig> {
    if (configInput[0] === '.') {
        return {
            ...defaultConfig,
            extends: configInput,
        }
    } else if (configInput[0] === '{') {
        try {
            return {
                ...defaultConfig,
                ...JSON.parse(configInput) as Partial<SemanticRelease.GlobalConfig>,
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
