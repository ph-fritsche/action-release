import config from '@ph.fritsche/eslint-config'

export default [
    // TODO: remove filter when fix is released:
    // https://github.com/ph-fritsche/eslint-config/commit/30eac5d0e4d25b9e5892f61828087b28d0482b4b
    ...config.filter(c => !c.plugins?.['@testing-library']),
    {
        rules:{
            // The hooks for semantic-release plugins are designed to be async.
            // The current implementation `await` the Promise and returning `undefined` would be safe,
            // but this is an implementation detail of `semantic-release` and might change.
            // Marking every hook as `async` is easier to read than `return Promise.resolve()`.
            '@typescript-eslint/require-await': 0,
        },
    },
    {
        files: ['test/**'],
        rules: {
            '@typescript-eslint/no-unsafe-assignment': 0,
        },
    },
]

