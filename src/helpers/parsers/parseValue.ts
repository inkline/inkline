import { Configuration, UserConfiguration } from '../../types';
import { parseFn } from './parseFn';

export function parseValue<T = unknown> (
    config: Configuration,
    value: T | UserConfiguration.PropertyFn<T>
): T {
    if (typeof value === 'function') {
        return parseFn(config, value as UserConfiguration.PropertyFn<T>);
    }

    return value;
}
