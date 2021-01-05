import * as core from '@actions/core'
import semanticRelease from 'semantic-release'
import defaultConfig from './defaultConfig'
import { install } from './util/install'

export async function run(): Promise<void> {
    try {
        const packages: string[] = []

        const dryRun = Boolean(safeParse(core.getInput('dry', { required: false })))
        const config = getConfig(core.getInput('config', { required: false}), defaultConfig, packages)

        config.plugins?.forEach(p => {
            const pName = typeof(p) === 'string' ? p : p[0]
            packages.push(pName)
        })

        install(packages)

        if (dryRun) {
            core.debug('DRY RUN')
        }

        const result = await semanticRelease({...config, dryRun})

        if (result === false) {
            core.info('Release skipped')
        } else {
            const { lastRelease, nextRelease, commits, releases } = result

            core.info(`${nextRelease.type} release: ${lastRelease.version} -> ${nextRelease.version}`)
            core.info(` including ${commits.length} commits`)

            releases.map(r => core.info(`-> Released ${r.name} by ${r.pluginName}: ${r.url}`))

            core.setOutput('release_type', nextRelease.type)

            const parts = ['major', 'minor', 'patch', 'revision']
            const v = nextRelease.version.split(/\D/, 4)
            parts.forEach((k, i) => core.setOutput(`release_${k}`, v[i]))

            core.setOutput('release_notes', nextRelease.notes)
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
