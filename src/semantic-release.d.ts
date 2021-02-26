import SemanticRelease from 'semantic-release'

export type PluginConfig = {
    [k: string]: unknown,
}

interface pluginFunc {
    (config: PluginConfig, context: SemanticRelease.Context): Promise<unknown>
}

export type Plugin = {
    verifyConditions?: pluginFunc,
    analyzeCommits?: (config: PluginConfig, context: SemanticRelease.Context) => Promise<string | null>,
    verifyRelease?: pluginFunc,
    generateNotes?: pluginFunc,
    prepare?: pluginFunc,
    publish?: pluginFunc,
    addChannel?: pluginFunc,
    success?: pluginFunc,
    fail?: pluginFunc,
    [k: string]: unknown
}

// see https://github.com/semantic-release/semantic-release/blob/master/lib/plugins/utils.js#L54
export type PluginSpec = [PluginDef, PluginConfig] | ({path: PluginDef} & PluginConfig) | PluginDef

// see https://github.com/semantic-release/semantic-release/blob/master/lib/plugins/index.js#L17
export type PluginDef = string | Plugin
