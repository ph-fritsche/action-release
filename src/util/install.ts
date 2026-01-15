import { spawn } from './spawn'
import { resolve } from './resolve'

export function install(
    packages: string[],
    log: (msg: string) => void,
    debug = true,
): Promise<string> {
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
        if (!debug) {
            args.push('--silent')
        }
        args.push('--', ...missing)

        return spawn('npm', args, {
            cwd: __dirname,
        })
    }

    return Promise.resolve('')
}
