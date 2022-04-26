const { buildSync } = require('esbuild')

buildSync({
    entryPoints: ['src/action.ts'],
    bundle: true,
    platform: 'node',
    outfile: 'build/index.js',
    external: [
        'debug',
        'semantic-release',
    ],
})
