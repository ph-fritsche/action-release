import * as core from '@actions/core'
import * as child_process from 'child_process'

export function spawn(cmd: string, args: string[] = [], options: child_process.SpawnOptions = {}): Promise<string> {
    return new Promise((res, rej) => {
        const child = child_process.spawn(cmd, args, options)

        let output = ''
        const buffer = {out: '', err: ''}
        function addBuffered(type: keyof typeof buffer, data: Buffer) {
            if (type === 'out') {
                output += data
            }
            buffer[type] += data
            sendBuffered(type)
        }
        function sendBuffered (type: keyof typeof buffer, force = false) {
            const nPos = buffer[type].lastIndexOf('\n')
            if (!force && nPos < 0 || !buffer[type]) {
                return
            }
            const slice = force ? buffer[type] : buffer[type].slice(0, nPos + 1)
            const lines = slice.split('\n')
            if (lines.some(ln => ln.trim())) {
                const logger = type === 'out' ? core.debug : core.warning
                if (lines[lines.length -1].trim() === '') {
                    lines.pop()
                }
                lines.forEach(ln => logger(ln))
                buffer[type] = buffer[type].slice(slice.length)
            }
        }

        child.on('error', (code: number, signal: string) => {
            rej(`Failed to spawn "${cmd}": ${signal ?? code}`)
        })
        child.on('exit', (code: number, signal: string) => {
            sendBuffered('out', true)
            sendBuffered('err', true)
            if (code === 0) {
                res(output)
            } else {
                rej(`${cmd} ${JSON.stringify(args)} failed: ${signal ?? code}`)
            }
        })

        child.stdout?.on('data', (data: Buffer) => addBuffered('out', data))
        child.stderr?.on('data', (data: Buffer) => addBuffered('err', data))
    })
}
