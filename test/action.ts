
let run: () => Promise<void>

jest.mock('../src/index', () => ({
    __esModule: true,
    default: () => run(),
}))

it('import with side-effect', async () => {
    run = jest.fn(() => Promise.resolve())

    return import('../src/action').then(() => {
        expect(run).toHaveBeenCalled()
    })
})
