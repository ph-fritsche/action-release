import * as initialRelease from '../../src/plugin/initialRelease'
import { setup } from './_setup'

it('Return "patch" for initial release', async () => {
    const { exec, logger } = setup(initialRelease.analyzeCommits)

    expect(await exec({}, {})).toBe('patch')
    expect(logger.log).toHaveBeenCalledWith('Initial release')

    expect(await exec({}, {lastRelease: {gitHead: 'abcdef...', gitTag: 'v1.2.3', version: '1.2.3'}})).toBe(null)
    expect(logger.log).not.toHaveBeenCalled()
})
