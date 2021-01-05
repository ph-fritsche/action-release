import * as core from '@actions/core'
import * as child_process from 'child_process'

export function spawn(cmd: string, args: string[] = [], options: child_process.SpawnOptions = {}): Promise<void> {
    return new Promise<void>((res, rej) => {
        const child = child_process.spawn(cmd, args, options)

        child.on('exit', (code, signal) => rej(`Failed to spawn "${cmd}": ${code}, ${signal}`))
        child.on('close', (code) => {
            if (code === 0) {
                res()
            } else {
                rej(`${cmd} ${JSON.stringify(args)} failed with code "${code}"`)
            }
            process.stdin.end()
        })

        child.stdout?.on('data', core.debug)
        child.stderr?.on('data', core.warning)
    })
}
