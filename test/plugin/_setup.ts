import {BaseContext} from 'semantic-release'
import {PluginConfig} from '../../src/semantic-release'

export function setup<C extends BaseContext, R>(
    callback: (config: PluginConfig, context: C) => R,
) {
    const logger: {
        [k in keyof BaseContext['logger']]: jest.Mock<BaseContext['logger'][k]>
    } = {
        addSecrets: jest.fn(),
        await: jest.fn(),
        clearSecrets: jest.fn(),
        config: jest.fn(),
        complete: jest.fn(),
        debug: jest.fn(),
        disable: jest.fn(),
        enable: jest.fn(),
        error: jest.fn(),
        fatal: jest.fn(),
        fav: jest.fn(),
        info: jest.fn(),
        isEnabled: jest.fn(),
        log: jest.fn(),
        note: jest.fn(),
        pause: jest.fn(),
        pending: jest.fn(),
        scope: jest.fn(),
        success: jest.fn(),
        star: jest.fn(),
        start: jest.fn(),
        time: jest.fn(),
        timeEnd: jest.fn(),
        unscope: jest.fn(),
        warn: jest.fn(),
        watch: jest.fn(),
    } satisfies BaseContext['logger']

    return {
        exec: (config: Partial<PluginConfig>, context: Partial<C>) => {
            Object.values(logger).forEach(l => l.mockClear())

            return callback({...config}, {...context, logger} as unknown as C)
        },
        logger,
    }
}
