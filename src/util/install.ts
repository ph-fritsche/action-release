import { info } from '@actions/core'
import { spawn } from './spawn'
import { resolve } from './resolve'

export function install(packages: string[], log: (msg: string) => void): Promise<void> {
    const missing = packages.filter(resolvableName => {
        try {
            const module = resolve(resolvableName)
            log(`"${resolvableName}" resolved to "${module}"`)
            return false
        } catch (e) {
            return true
        }
    })

    if (missing.length) {
        log(`Install ${JSON.stringify(missing)}`)

        const options = ['--no-save']
        if (log === info) { // if logging function is not core.info, we're in debug/test
            options.push('--silent')
        }

        return spawn('npm', ['install', ...options, '--', ...missing], {})
    }

    return Promise.resolve()
}
