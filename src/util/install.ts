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
        return spawn('npm', ['install', '--no-save', '--silent', '--', ...missing], {})
    }

    return Promise.resolve()
}
