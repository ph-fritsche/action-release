import { info } from '@actions/core'
import { spawn } from './spawn'
import { resolve } from './resolve'

export function install(packages: string[], log: (msg: string) => void): Promise<string> {
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

        const args = ['install', '--no-save']
        if (log !== info) { // if logging function is core.info, we're in debug/test
            args.push('--silent')
        }
        args.push('--', ...missing)

        return spawn('npm', args, {})
    }

    return Promise.resolve('')
}
