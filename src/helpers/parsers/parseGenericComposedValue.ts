import { Configuration, UserConfiguration } from '../../types';
import { parseFn } from './parseFn';
import { interpolate } from '../interpolate';

export function parseGenericComposedValue<T = unknown> (
    config: Configuration,
    value: T,
    fields: string[]
): Record<string, string> {
    const result: Record<string, string> = {};

    const assignFieldsFromArray = (values: string[]) => {
        fields.forEach((field, index) => {
            result[field] = values[index];
        });
    };

    if (typeof value === 'function') {
        return parseGenericComposedValue(config, parseFn<T>(config, value as unknown as UserConfiguration.PropertyFn<T>), fields);
    } else {
        assignFieldsFromArray(interpolate(value, { theme: config.theme }).split(/\s+/));
    }

    return result;
}
