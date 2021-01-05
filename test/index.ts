import { run } from '../src/index'

let coreInput: {[k: string]: string | undefined} = {}

let setFailed: (msg: string) => void
let debug: (msg: string) => void
let info: (msg: string) => void

jest.mock('@actions/core', () => ({
    getInput(k: string, {required}: {required: boolean}) {
        if (required && !coreInput[k]) {
            throw `Missing input`
        }
        return coreInput[k] ?? ''
    },
    debug: (msg: string) => debug(msg),
    info: (msg: string) => info(msg),
    setFailed: (msg: string) => setFailed(msg),
}))

function setup() {
    setFailed = jest.fn()
    debug = jest.fn()
    info = jest.fn()

    const exec = (input = {}) => {
        coreInput = input
        return run()
    }

    return { exec }
}

it('Execute (dryRun)', () => {
    const { exec } = setup()

    const run = exec({
        dryRun: true,
    })

    return run.finally(() => {
        expect(setFailed).not.toHaveBeenCalled()
    })
})
