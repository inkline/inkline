import { Configuration } from '../../types';
import { parseValue } from './parseValue';

export function parseRecursive<T = Record<string, any>> (
    config: Configuration,
    value: Record<any, any>
): T {
    Object.keys(value).forEach((key) => {
        if (typeof value[key] === 'object') {
            value[key] = parseRecursive(config, value[key]);
        } else if (typeof value[key] === 'string' || typeof value[key] === 'function') {
            value[key] = parseValue(config, value[key]);
        }
    });

    return value;
}
