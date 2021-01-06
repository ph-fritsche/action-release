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
} as Partial<GlobalConfig>
