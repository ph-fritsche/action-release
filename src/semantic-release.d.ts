import type * as SemanticRelease from 'semantic-release'

export type PluginConfig = {
    [k: string]: unknown,
}

interface pluginFunc<Context extends SemanticRelease.BaseContext = SemanticRelease.BaseContext> {
    (config: PluginConfig, context: Context): Promise<unknown>
}

export type Plugin = {
    verifyConditions?: pluginFunc<SemanticRelease.VerifyConditionsContext>,
    analyzeCommits?: (config: PluginConfig, context: SemanticRelease.AnalyzeCommitsContext) => Promise<string | null>,
    verifyRelease?: pluginFunc<SemanticRelease.VerifyReleaseContext>,
    generateNotes?: pluginFunc<SemanticRelease.GenerateNotesContext>,
    prepare?: pluginFunc<SemanticRelease.PrepareContext>,
    publish?: pluginFunc<SemanticRelease.PublishContext>,
    addChannel?: pluginFunc<SemanticRelease.AddChannelContext>,
    success?: pluginFunc<SemanticRelease.SuccessContext>,
    fail?: pluginFunc<SemanticRelease.FailContext>,
    [k: string]: unknown
}

// see https://github.com/semantic-release/semantic-release/blob/master/lib/plugins/utils.js#L54
export type PluginSpec = [PluginDef, PluginConfig] | ({path: PluginDef} & PluginConfig) | PluginDef

// see https://github.com/semantic-release/semantic-release/blob/master/lib/plugins/index.js#L17
export type PluginDef = string | Plugin
