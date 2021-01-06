import { resolve } from '../../src/util/resolve'

test('export resolve function', () => {
    expect(resolve('../index')).toBe(require.resolve('../../src/index'))
})
