import { Configuration, UserConfiguration } from '../../types';
import { parseFn } from './parseFn';
import { interpolate } from '../interpolate';

export function parseValue<T = unknown> (
    config: Configuration,
    value: T | UserConfiguration.PropertyFn<T>
): T | string {
    if (typeof value === 'function') {
        return parseFn(config, value as UserConfiguration.PropertyFn<T>);
    } else if (typeof value === 'string') {
        return interpolate(value, { theme: config.theme });
    }

    return value;
}
