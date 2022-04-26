import type SemanticRelease from 'semantic-release'
import run from '../src/index'
import { forceRelease, initialRelease } from '../src/plugin'
import defaultResult from './_releaseResult'
import type { updateTags as realUpdateTags } from '../src/util/updateTags'

const releaseResult = defaultResult as SemanticRelease.Result

let coreInput: {[k: string]: string | undefined} = {}
let coreOutput: {[k: string]: string} = {}
let coreDebug: string[] = []
let coreInfo: string[] = []
let setFailed: (msg: string) => void
jest.mock('@actions/core', () => ({
    getInput(k: string, {required}: {required: boolean}) {
        if (required && !coreInput[k]) {
            throw `Missing input`
        }
        return coreInput[k] ?? ''
    },
    setOutput(k: string, v: string) {
        coreOutput[k] = v
    },
    isDebug: () => false,
    debug: (msg: string) => { coreDebug.push(msg) },
    info: (msg: string) => { coreInfo.push(msg) },
    setFailed: (msg: string) => setFailed(msg),
}))

let release: jest.MockedFunction<(options: SemanticRelease.Options, config: SemanticRelease.Config) => SemanticRelease.Result>
jest.mock('semantic-release', () => (options: SemanticRelease.Options, config: SemanticRelease.Config) => release(options, config))

let debugEnable: jest.MockedFunction<(ident: string) => void>
jest.mock('debug', () => ({
    enable: (ident: string) => debugEnable(ident),
}))

let install: jest.MockedFunction<(packages: string[]) => Promise<string>>
jest.mock('../src/util/install', () => ({
    install: (packages: string[]) => install(packages),
}))

let gitConfig: jest.MockedFunction<() => Promise<string>>
jest.mock('../src/util/gitConfig', () => ({
    gitConfig: () => gitConfig(),
}))

let updateTags: jest.MockedFunction<typeof realUpdateTags>
jest.mock('../src/util/updateTags', () => ({
    updateTags: (...a: Parameters<typeof realUpdateTags>) => updateTags(...a),
}))

jest.mock('../src/util/spawn', () => ({
    spawn: () => { throw 'this should not have been called - every helper should be mocked' },
}))

function setup() {
    const exec = (input = {}, releaseResult: SemanticRelease.Result = false, env = {}) => {
        setFailed = jest.fn()
        coreInput = input
        coreOutput = {}
        coreDebug = []
        coreInfo = []
        debugEnable = jest.fn()

        install = jest.fn().mockImplementation(() => Promise.resolve(''))
        release = jest.fn().mockImplementation(() => releaseResult)
        gitConfig = jest.fn().mockImplementation(() => Promise.resolve(''))
        updateTags = jest.fn().mockImplementation(() => Promise.resolve([]))

        return run(env)
    }

    return { exec }
}

it('run skipped release', () => {
    const { exec } = setup()

    const run = exec()

    return run.finally(() => {
        expect(setFailed).not.toHaveBeenCalled()
        expect(coreInfo).toEqual([expect.stringMatching('skipped')])
    })
})

it('run with dry run option', () => {
    const { exec } = setup()

    const run = exec({dry: 'true'})

    return run.finally(() => {
        expect(coreDebug).toEqual(expect.arrayContaining(['DRY RUN']))
        expect(release).toBeCalledTimes(1)
        expect(release.mock.calls[0][0]).toMatchObject({dryRun: true})
    })
})

it('run with debug option', () => {
    const { exec } = setup()

    const run = exec({debug: 'true'})

    return run.finally(() => {
        expect(debugEnable).toBeCalled()
        expect(release).toBeCalled()
    })
})

it('output release informations', () => {
    const { exec } = setup()

    const run = exec(undefined, releaseResult)

    return run.finally(() => {
        expect(coreOutput).toEqual({
            type: 'minor',
            lastVersion: '1.0.0',
            gitTag: 'v1.1.0',
            version: '1.1.0',
            major: '1',
            minor: '1',
            patch: '0',
            revision: '',
            revisionType: '',
            notes: 'Release notes for version 1.1.0...',
        })
    })
})

it('setup forceRelease plugin', () => {
    const { exec } = setup()

    const run = exec({force: 'foobar'})

    return run.finally(() => {
        expect(release).toBeCalledTimes(1)
        expect(release.mock.calls[0][0]).toMatchObject({
            plugins: expect.arrayContaining([forceRelease]),
        })
        expect(release.mock.calls[0][1]).toMatchObject({
            env: expect.objectContaining({
                RELEASE_FORCE: 'foobar',
            }),
        })
    })
})

it('setup initialRelease plugin', () => {
    const { exec } = setup()

    const run = exec()

    return run.finally(() => {
        expect(release).toBeCalledTimes(1)
        expect(release.mock.calls[0][0]).toMatchObject({
            plugins: expect.arrayContaining([initialRelease]),
        })
    })
})

it('run with extended config', () => {
    const { exec } = setup()

    const run = exec({config: '@my-namespace/my-shared-config'})

    return run.finally(() => {
        expect(install).toHaveBeenCalledWith(expect.arrayContaining(['@my-namespace/my-shared-config']))
        expect(release.mock.calls[0][0]).toMatchObject({
            extends: '@my-namespace/my-shared-config',
        })
    })
})

it('run with local extended config', () => {
    const { exec } = setup()

    const run = exec({ config: './my-local-config' })

    return run.finally(() => {
        expect(install).toHaveBeenCalledWith(expect.not.arrayContaining(['./my-local-config']))
        expect(release.mock.calls[0][0]).toMatchObject({
            extends: './my-local-config',
        })
    })
})

it('run with inline config', () => {
    const { exec } = setup()

    const run = exec({ config: '{"preset":"angular"}' })

    return run.finally(() => {
        expect(install).toHaveBeenCalledWith(expect.arrayContaining(['conventional-changelog-angular']))
        expect(release.mock.calls[0][0]).toMatchObject({
            preset: 'angular',
        })
    })
})

it('call updateTag', () => {
    const { exec } = setup()

    const run = exec(undefined, {...defaultResult, nextRelease: {
        gitHead: 'abc',
        gitTag: 'v1.2.3-foo.1',
        notes: 'some notes...',
        type: 'major',
        version: '1.2.3-foo.1',
    }})

    return run.finally(() => {
        expect(gitConfig).toBeCalled()
        expect(updateTags).toBeCalledWith('HEAD', '1.2.3-foo.1', {
            major: '1',
            minor: '2',
            patch: '3',
            revision: 'foo.1',
            revisionType: 'foo',
        }, 'v')
    })
})
