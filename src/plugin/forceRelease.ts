import SemanticRelease from 'semantic-release'
import { PluginConfig } from '../semantic-release'
import { getReleaseType, releaseTypes } from './shared/releaseTypes'

/**
 * Force release per environment variable
 */
export async function analyzeCommits(
    config: PluginConfig,
    context: SemanticRelease.Context,
): Promise<releaseTypes | null> {
    if (!context.env.RELEASE_FORCE) {
        return null
    }
    const type = getReleaseType(context.env.RELEASE_FORCE) ?? releaseTypes.patch
    context.logger.log('Force release: %s', type)
    return type
}
