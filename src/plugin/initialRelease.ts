import type * as SemanticRelease from 'semantic-release'
import type { PluginConfig } from '../semantic-release'
import { releaseTypes } from './shared/releaseTypes'

/**
 * Trigger initial release
 */
export async function analyzeCommits(
    config: PluginConfig,
    context: SemanticRelease.Context,
): Promise<releaseTypes.patch | null> {
    if (!context.lastRelease?.gitHead) {
        context.logger.log('Initial release')
        return releaseTypes.patch
    }
    return null
}
