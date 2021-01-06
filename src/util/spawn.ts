import * as core from '@actions/core'
import * as child_process from 'child_process'

export function spawn(cmd: string, args: string[] = [], options: child_process.SpawnOptions = {}): Promise<void> {
    return new Promise<void>((res, rej) => {
        const child = child_process.spawn(cmd, args, options)

        child.on('error', (code: number, signal: string) => {
            rej(`Failed to spawn "${cmd}": ${signal ?? code}`)
        })
        child.on('exit', (code: number, signal: string) => {
            if (code === 0) {
                res()
            } else {
                rej(`${cmd} ${JSON.stringify(args)} failed: ${signal ?? code}`)
            }
            process.stdin.end()
        })

        child.stdout?.on('data', (data: Buffer) => core.debug(String(data)))
        child.stderr?.on('data', (data: Buffer) => core.warning(String(data)))
    })
}
