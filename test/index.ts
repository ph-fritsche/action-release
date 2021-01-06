import type SemanticRelease from 'semantic-release'
import run from '../src/index'
import defaultResult from './_releaseResult'

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

let release: (options: SemanticRelease.Options, config: SemanticRelease.Config) => SemanticRelease.Result
jest.mock('semantic-release', () => (options: SemanticRelease.Options, config: SemanticRelease.Config) => release(options, config))

let debugEnable: (ident: string) => void
jest.mock('debug', () => ({
    enable: (ident: string) => debugEnable(ident),
}))

jest.mock('../src/util/install', () => ({
    install: () => Promise.resolve(),
}))

function setup() {
    const exec = (input = {}, releaseResult: SemanticRelease.Result = false) => {
        setFailed = jest.fn()
        coreInput = input
        coreOutput = {}
        coreDebug = []
        coreInfo = []
        debugEnable = jest.fn()

        release = jest.fn(() => releaseResult)

        return run()
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
        expect((release as jest.Mock).mock.calls[0][0]).toMatchObject({dryRun: true})
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
            revision: undefined,
            notes: 'Release notes for version 1.1.0...',
        })
    })
})
