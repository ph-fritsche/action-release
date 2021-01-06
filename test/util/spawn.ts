import type { ChildProcess, SpawnOptions } from 'child_process'
import { EventEmitter } from 'events'
import { spawn } from '../../src/util/spawn'

const { spawn: realSpawn } = jest.requireActual('child_process')
let spawnMock: (cmd: string, args: string[], options: SpawnOptions) => ChildProcess
jest.mock('child_process', () => ({
    spawn: (cmd: string, args: string[], options: SpawnOptions): ChildProcess => spawnMock(cmd, args, options),
}))

let coreDebug: string[] = []
let coreWarning: string[] = []
jest.mock('@actions/core', () => ({
    debug: (msg: string) => { coreDebug.push(msg) },
    warning: (msg: string) => { coreWarning.push(msg) },
}))


test('defer args and options', () => {
    spawnMock = jest.fn(() => realSpawn(process.execPath, ['-e', `process.exit(0)`]))

    const child = spawn('foo', ['bar', 'baz'], {uid: 123456})

    expect(spawnMock).toBeCalledWith('foo', ['bar', 'baz'], {uid: 123456})

    return expect(child).resolves.toBe(undefined)
})

test('reject on spawn error', () => {
    spawnMock = jest.fn(() => {
        const p = new EventEmitter() as ChildProcess
        setTimeout(() => p.emit('error', null, 'ENOSUP'), 1)
        return p
    })

    const child = spawn('foo', ['bar', 'baz'], {uid: 123456})

    expect(spawnMock).toBeCalledWith('foo', ['bar', 'baz'], {uid: 123456})

    return expect(child).rejects.toMatch('ENOSUP')
})

test('reject on error', () => {
    spawnMock = jest.fn(() => realSpawn(process.execPath, ['-e', `process.exit(1)`]))

    const child = spawn('foo', ['bar', 'baz'], {uid: 123456})

    return expect(child).rejects.toMatch(': 1')
})


test('defer stdout to debug', () => {
    coreDebug = []
    spawnMock = jest.fn(() => realSpawn(process.execPath, ['-e', `process.stdout.write('foo')`]))

    return spawn('foo', ['bar', 'baz'], { uid: 123456 }).finally(() => {
        expect(coreDebug).toEqual(['foo\n'])
    })
})

test('defer stderr to warning', () => {
    coreWarning = []
    spawnMock = jest.fn(() => realSpawn(process.execPath, ['-e', `process.stderr.write('foo')`]))

    return spawn('foo', ['bar', 'baz'], { uid: 123456 }).finally(() => {
        expect(coreWarning).toEqual(['foo\n'])
    })
})
