import { ConfigurationContext, Theme } from '../../types';
import { parseValue } from './parseValue';

export function parseRecursive<ValueType = Record<string, any>, ReturnType = Record<string, any>>(
    context: ConfigurationContext<Theme, ValueType>
): ReturnType {
    const value = context.value as Record<string, any>;

    Object.keys(value).forEach((key) => {
        if (typeof value[key] === 'object') {
            value[key] = parseRecursive({
                ...context,
                value: value[key]
            });
        } else {
            value[key] = parseValue({
                ...context,
                value: value[key]
            });
        }
    });

    return value as ReturnType;
}
