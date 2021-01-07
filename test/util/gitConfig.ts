import { gitConfig } from '../../src/util/gitConfig'

let spawnMock: (...a: unknown[]) => Promise<string>
jest.mock('../../src/util/spawn', () => ({
    spawn: (...a: unknown[]) => spawnMock(...a),
}))

test('set github actor', async () => {
    spawnMock = jest.fn()

    await gitConfig({GITHUB_ACTOR: 'foo'})

    expect(spawnMock).toHaveBeenNthCalledWith(1, 'git', ['config', '--global', 'user.name', 'foo'])
    expect(spawnMock).toHaveBeenNthCalledWith(2, 'git', ['config', '--global', 'user.email', 'foo@users.noreply.github.com'])
    expect(spawnMock).toHaveBeenCalledTimes(2)
})
