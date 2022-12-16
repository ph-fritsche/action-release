import { Context } from 'semantic-release'
import { PluginConfig } from '../../src/semantic-release'

export function setup<R>(
    callback: (config: PluginConfig, context: Context) => R,
) {
    const logger: {
        [k in keyof Context['logger']]: jest.Mock<Context['logger'][k]>
    } = {
        await: jest.fn(),
        complete: jest.fn(),
        debug: jest.fn(),
        fatal: jest.fn(),
        fav: jest.fn(),
        error: jest.fn(),
        info: jest.fn(),
        log: jest.fn(),
        note: jest.fn(),
        pause: jest.fn(),
        pending: jest.fn(),
        star: jest.fn(),
        start: jest.fn(),
        success: jest.fn(),
        wait: jest.fn(),
        warn: jest.fn(),
        watch: jest.fn(),
    }

    return {
        exec: (config: Partial<PluginConfig>, context: Partial<Context>) => {
            Object.values(logger).forEach(l => l.mockClear())

            return callback({...config}, {
                branch: {name: 'main'},
                logger,
                env: {},
                ...context,
            })
        },
        logger,
    }
}
