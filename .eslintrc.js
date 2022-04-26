module.exports = {
    extends: [
        '@ph.fritsche/eslint-config',
    ],
    rules: {
        // The hooks for semantic-release plugins are designed to be async.
        // The current implementation `await` the Promise and returning `undefined` would be safe,
        // but this is an implementation detail of `semantic-release` and might change.
        // Marking every hook as `async` is easier to read than `return Promise.resolve()`.
        '@typescript-eslint/require-await': 0,
    },
    overrides: [
        {
            files: ['test/**'],
            rules: {
                '@typescript-eslint/no-unsafe-assignment': 0,
            },
        },
    ],
}
