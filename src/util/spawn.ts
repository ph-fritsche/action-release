import * as core from '@actions/core'
import * as child_process from 'child_process'

export function spawn(cmd: string, args: string[] = [], options: child_process.SpawnOptions = {}): Promise<void> {
    return new Promise<void>((res, rej) => {
        const child = child_process.spawn(cmd, args, options)

        const buffer = {out: '', err: ''}
        function addBuffered(type: keyof typeof buffer, data: Buffer) {
            buffer[type] += data
            sendBuffered(type)
        }
        function sendBuffered (type: keyof typeof buffer, force = false) {
            const nPos = buffer[type].lastIndexOf('\n')
            let send
            if (force && buffer[type] && buffer[type].substr(-1) !== '\n') {
                send = buffer[type] + '\n'
            } else if (!force && nPos < 0) {
                return
            } else {
                send = buffer[type]
            }
            if (send && send.trim()) {
                (type === 'out' ? core.debug : core.warning)(send)
                buffer[type] = buffer[type].slice(send.length)
            }
        }

        child.on('error', (code: number, signal: string) => {
            rej(`Failed to spawn "${cmd}": ${signal ?? code}`)
        })
        child.on('exit', (code: number, signal: string) => {
            sendBuffered('out', true)
            sendBuffered('err', true)
            if (code === 0) {
                res()
            } else {
                rej(`${cmd} ${JSON.stringify(args)} failed: ${signal ?? code}`)
            }
        })

        child.stdout?.on('data', (data: Buffer) => addBuffered('out', data))
        child.stderr?.on('data', (data: Buffer) => addBuffered('err', data))
    })
}
