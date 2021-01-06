import { install } from '../../src/util/install'

let coreDebug: string[] = []
jest.mock('@actions/core', () => ({
    debug: (msg: string) => { coreDebug.push(msg) },
}))

let resolveMock: (name: string) => unknown
jest.mock('../../src/util/resolve', () => ({
    resolve: (name: string) => resolveMock(name),
}))

let spawnMock: (...a: unknown[]) => Promise<void>
jest.mock('../../src/util/spawn', () => ({
    spawn: (...a: unknown[]) => spawnMock(...a),
}))

test('skip present modules', () => {
    coreDebug = []
    spawnMock = jest.fn()
    resolveMock = jest.fn(() => 'existingPath')

    install(['foo', 'bar'])

    expect(resolveMock).toHaveBeenNthCalledWith(1, 'foo')
    expect(resolveMock).toHaveBeenNthCalledWith(2, 'bar')
    expect(spawnMock).not.toBeCalled()
    expect(coreDebug).toEqual(expect.arrayContaining([
        expect.stringMatching('"foo" resolved'),
        expect.stringMatching('"bar" resolved'),
    ]))
})

test('install missing modules', () => {
    coreDebug = []
    spawnMock = jest.fn()
    resolveMock = jest.fn(() => { throw 'doesNotExist' })

    install(['foo', 'bar'])

    expect(resolveMock).toHaveBeenNthCalledWith(1, 'foo')
    expect(resolveMock).toHaveBeenNthCalledWith(2, 'bar')
    expect(spawnMock).toBeCalledTimes(1)
    expect((spawnMock as jest.Mock).mock.calls[0][0]).toBe('npm')
    expect((spawnMock as jest.Mock).mock.calls[0][1][0]).toBe('install')
    expect((spawnMock as jest.Mock).mock.calls[0][1]).toContain('foo')
    expect((spawnMock as jest.Mock).mock.calls[0][1]).toContain('bar')
    expect(coreDebug).toEqual([expect.stringContaining('Install ["foo","bar"]')])
})
