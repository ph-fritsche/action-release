import * as core from '@actions/core'
import semanticRelease from 'semantic-release'
import defaultConfig from './defaultConfig'
import { install } from './util/install'
import debugLib from 'debug'

export default async function run(): Promise<void> {
    try {
        const packages: string[] = ['semantic-release'] // npm warns about missing peer dependency without this

        const config = getConfig(core.getInput('config', { required: false}), defaultConfig, packages)
        const dryRun = Boolean(safeParse(core.getInput('dry', { required: false })))
        const debug = Boolean(safeParse(core.getInput('debug', { required: false }))) || core.isDebug()

        const log = debug ? core.info : core.debug

        config.plugins?.forEach(p => {
            const pName = typeof(p) === 'string' ? p : p[0]
            packages.push(pName)
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

        const result = await semanticRelease({
            ...config,
            dryRun,
        }, {})

        if (result === false) {
            core.info('Release skipped')
        } else {
            const { lastRelease, nextRelease, commits, releases } = result

            core.info('\n')
            core.info(`${nextRelease.type} release: ${lastRelease.version} -> ${nextRelease.version}`)
            core.info(` including ${commits.length} commits`)

            releases.map(r => core.info(`-> Released ${r.name} by ${r.pluginName}: ${r.url}`))

            core.setOutput('lastVersion', lastRelease.version)

            core.setOutput('type', nextRelease.type)
            core.setOutput('version', nextRelease.version)
            core.setOutput('gitTag', nextRelease.gitTag)

            const parts = ['major', 'minor', 'patch', 'revision']
            const v = nextRelease.version.split(/\D/, 4)
            parts.forEach((k, i) => core.setOutput(k, v[i]))

            core.setOutput('notes', nextRelease.notes)
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
