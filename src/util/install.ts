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

        // if logging function is core.info, we're in debug/test
        const isDebug = log === info

        const args = ['install', '--no-save']
        if (!isDebug) {
            args.push('--silent')
        }
        args.push('--', ...missing)

        return spawn('npm', args, {
            cwd: __dirname,
        })
    }

    return Promise.resolve('')
}
