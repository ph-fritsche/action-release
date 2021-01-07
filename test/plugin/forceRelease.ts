import * as forceRelease from '../../src/plugin/forceRelease'
import { setup } from './_setup'

it('Return sanitized force release value', async () => {
    const { exec, logger } = setup(forceRelease.analyzeCommits)

    expect(await exec({}, {env: {RELEASE_FORCE: 'foo'}})).toBe('patch')
    expect(logger.log).toBeCalledWith('Force release: %s', 'patch')

    expect(await exec({}, {env: {RELEASE_FORCE: ''}})).toBe(null)
    expect(logger.log).not.toBeCalled()

    expect(await exec({}, {env: {RELEASE_FORCE: 'major'}})).toBe('major')
    expect(logger.log).toBeCalledWith('Force release: %s', 'major')
})
