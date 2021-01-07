import { updateTags } from '../../src/util/updateTags'

let spawnMock: (...a: unknown[]) => Promise<string>
jest.mock('../../src/util/spawn', () => ({
    spawn: (...a: unknown[]) => spawnMock(...a),
}))

test('set tags', async () => {
    spawnMock = jest.fn()

    await updateTags('abc', '1.2.3', {major: '1', minor: '2', patch: '3', revision: undefined, revisionType: undefined}, 'version')

    expect(spawnMock).toHaveBeenNthCalledWith(1, 'git', ['ls-remote', 'origin', 'refs/tags/version1.3.0'])
    expect(spawnMock).toHaveBeenNthCalledWith(2, 'git', ['tag', '-fam', '1.2.3', 'version1.2', 'abc'])
    expect(spawnMock).toHaveBeenNthCalledWith(3, 'git', ['tag', '-fam', '1.2.3', 'version1', 'abc'])
    expect(spawnMock).toHaveBeenNthCalledWith(4, 'git', ['push', '-f', 'origin', 'refs/tags/version1.2:refs/tags/version1.2', 'refs/tags/version1:refs/tags/version1'])
    expect(spawnMock).toHaveBeenCalledTimes(4)
})

test('omit major on maintenance release', async () => {
    spawnMock = jest.fn().mockReturnValueOnce(Promise.resolve('abcdef\trefs/tags/v1.3.0'))

    await updateTags('abc', '1.2.3', {major: '1', minor: '2', patch: '3', revision: undefined, revisionType: undefined}, 'v')

    expect(spawnMock).toHaveBeenNthCalledWith(1, 'git', ['ls-remote', 'origin', 'refs/tags/v1.3.0'])
    expect(spawnMock).toHaveBeenNthCalledWith(2, 'git', ['tag', '-fam', '1.2.3', 'v1.2', 'abc'])
    expect(spawnMock).toHaveBeenNthCalledWith(3, 'git', ['push', '-f', 'origin', 'refs/tags/v1.2:refs/tags/v1.2'])
    expect(spawnMock).toHaveBeenCalledTimes(3)
})

test('set tag for prerelease', async () => {
    spawnMock = jest.fn().mockReturnValueOnce(Promise.resolve('abcdef\trefs/tags/v1.3.0'))

    await updateTags('abc', '1.2.3-foo.1', {major: '1', minor: '2', patch: '3', revision: 'foo.1', revisionType: 'foo'}, 'v')

    expect(spawnMock).toHaveBeenNthCalledWith(1, 'git', ['tag', '-fam', '1.2.3-foo.1', 'v1.2.3-foo', 'abc'])
    expect(spawnMock).toHaveBeenNthCalledWith(2, 'git', ['push', '-f', 'origin', 'refs/tags/v1.2.3-foo:refs/tags/v1.2.3-foo'])
    expect(spawnMock).toHaveBeenCalledTimes(2)
})


