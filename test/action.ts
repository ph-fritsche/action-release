
let run: () => Promise<void>

jest.mock('../src/index', () => ({
    run: () => run(),
}))

it('side-effect run', async () => {
    run = jest.fn(() => Promise.resolve())

    return import('../src/action').then(() => {
        expect(run).toBeCalled()
    })
})
