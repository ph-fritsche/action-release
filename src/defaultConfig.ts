import type { GlobalConfig, PluginSpec } from 'semantic-release'

const plugins: PluginSpec[] = [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
]

if (process.env.NPM_TOKEN) {
    plugins.push('@semantic-release/npm')
}

export default {
    plugins,
    preset: 'conventionalcommits',
} as Partial<GlobalConfig>
