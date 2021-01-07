import SemanticRelease from 'semantic-release'

export type PluginConfig = {
    [k: string]: unknown,
}

interface pluginFunc {
    (config: PluginConfig, context: SemanticRelease.Context): Promise<unknown>
}

export type Plugin = {
    path?: string,
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

export type PluginSpec = SemanticRelease.PluginSpec | Plugin
