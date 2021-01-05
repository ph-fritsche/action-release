import * as core from '@actions/core'
import { spawn } from './spawn'

export function install(packages: string[]): Promise<void> {
    const missing = packages.filter(resolvableName => {
        try {
            const module = require.resolve(resolvableName)
            core.debug(`"${resolvableName}" resolved to "${module}"`)
            return false
        } catch (e) {
            return true
        }
    })

    if (missing.length) {
        core.debug(`Install ${JSON.stringify(missing)}`)
        return spawn('yarn', ['install', '--silent', '--', ...missing])
    }

    return Promise.resolve()
}
