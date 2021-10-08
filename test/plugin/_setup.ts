import { Context } from 'semantic-release'
import { PluginConfig } from '../../src/semantic-release'

export function setup<R>(
    callback: (config: PluginConfig, context: Context) => R,
): {
    exec: (config: Partial<PluginConfig>, context: Partial<Context>) => R,
    logger: {
        log: jest.Mock<Context['logger']['log']>,
        error: jest.Mock<Context['logger']['error']>,
    },
} {
    const logger = {
        log: jest.fn(),
        error: jest.fn(),
    }

    return {
        exec: (config, context) => {
            logger.log.mockClear()
            logger.error.mockClear()

            return callback({...config}, {logger, env: {}, ...context})
        },
        logger,
    }
}
