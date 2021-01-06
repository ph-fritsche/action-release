import { install } from '../../src/util/install'

let resolveMock: (name: string) => unknown
jest.mock('../../src/util/resolve', () => ({
    resolve: (name: string) => resolveMock(name),
}))

let spawnMock: (...a: unknown[]) => Promise<void>
jest.mock('../../src/util/spawn', () => ({
    spawn: (...a: unknown[]) => spawnMock(...a),
}))

test('skip present modules', () => {
    const log: string[] = []
    spawnMock = jest.fn()
    resolveMock = jest.fn(() => 'existingPath')

    install(['foo', 'bar'], (m) => log.push(m))

    expect(resolveMock).toHaveBeenNthCalledWith(1, 'foo')
    expect(resolveMock).toHaveBeenNthCalledWith(2, 'bar')
    expect(spawnMock).not.toBeCalled()
    expect(log).toEqual(expect.arrayContaining([
        expect.stringMatching('"foo" resolved'),
        expect.stringMatching('"bar" resolved'),
    ]))
})

test('install missing modules', () => {
    const log: string[] = []
    spawnMock = jest.fn()
    resolveMock = jest.fn(() => { throw 'doesNotExist' })

    install(['foo', 'bar'], (m) => log.push(m))

    expect(resolveMock).toHaveBeenNthCalledWith(1, 'foo')
    expect(resolveMock).toHaveBeenNthCalledWith(2, 'bar')
    expect(spawnMock).toBeCalledTimes(1)
    expect((spawnMock as jest.Mock).mock.calls[0][0]).toBe('npm')
    expect((spawnMock as jest.Mock).mock.calls[0][1][0]).toBe('install')
    expect((spawnMock as jest.Mock).mock.calls[0][1]).toContain('foo')
    expect((spawnMock as jest.Mock).mock.calls[0][1]).toContain('bar')
    expect(log).toEqual([expect.stringContaining('Install ["foo","bar"]')])
})
