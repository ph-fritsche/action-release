import { SpawnOptions } from 'child_process'
import path from 'path'
import { install } from '../../src/util/install'

let resolveMock: jest.MockedFunction<(name: string) => string>
jest.mock('../../src/util/resolve', () => ({
    resolve: (name: string) => resolveMock(name),
}))

let spawnMock: jest.MockedFn<(cmd: string, args: string[], opt: SpawnOptions) => Promise<string>>
jest.mock('../../src/util/spawn', () => ({
    spawn: (cmd: string, args: string[], opt: SpawnOptions) => spawnMock(cmd, args, opt),
}))

test('skip present modules', async () => {
    const log: string[] = []
    spawnMock = jest.fn()
    resolveMock = jest.fn().mockImplementation(() => 'existingPath')

    await install(['foo', 'bar'], (m) => log.push(m))

    expect(resolveMock).toHaveBeenNthCalledWith(1, 'foo')
    expect(resolveMock).toHaveBeenNthCalledWith(2, 'bar')
    expect(spawnMock).not.toBeCalled()
    expect(log).toEqual(expect.arrayContaining([
        expect.stringMatching('"foo" resolved'),
        expect.stringMatching('"bar" resolved'),
    ]))
})

test('install missing modules', async () => {
    const log: string[] = []
    spawnMock = jest.fn()
    resolveMock = jest.fn().mockImplementation(() => { throw 'doesNotExist' })

    await install(['foo', 'bar'], (m) => log.push(m))

    expect(resolveMock).toHaveBeenNthCalledWith(1, 'foo')
    expect(resolveMock).toHaveBeenNthCalledWith(2, 'bar')
    expect(spawnMock).toBeCalledTimes(1)
    expect(spawnMock.mock.calls[0][0]).toBe('npm')
    expect(spawnMock.mock.calls[0][1][0]).toBe('install')
    expect(spawnMock.mock.calls[0][1]).toContain('foo')
    expect(spawnMock.mock.calls[0][1]).toContain('bar')
    expect(log).toEqual([expect.stringContaining('Install ["foo","bar"]')])
})

test('install in dist', async () => {
    spawnMock = jest.fn()

    await install(['foo'], () => undefined)

    expect(spawnMock).toBeCalledTimes(1)
    expect(spawnMock.mock.calls[0][2]).toEqual(expect.objectContaining({
        // In test this should be the directory of the `install` util
        cwd: path.resolve(__dirname, '../../src/util'),
    }))
})
