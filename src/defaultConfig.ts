import type { GlobalConfig, PluginSpec } from 'semantic-release'

const plugins: PluginSpec[] = [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
]

if (process.env.NPM_TOKEN) {
    plugins.push('@semantic-release/npm')
}

if (process.env.GITHUB_TOKEN) {
    plugins.push('@semantic-release/github')
}

export default {
    plugins,
    preset: 'conventionalcommits',

    // See defaults: https://github.com/semantic-release/semantic-release/blob/master/lib/get-config.js#L57-L64
    // See issue: https://github.com/semantic-release/semantic-release/issues/1581
    // Moving ahead and adding `main` to the defaults
    branches: [
        '+([0-9])?(.{+([0-9]),x}).x',
        'main',
        'master',
        'next',
        'next-major',
        { name: 'beta', prerelease: true },
        { name: 'alpha', prerelease: true },
    ],
} as Partial<GlobalConfig>
