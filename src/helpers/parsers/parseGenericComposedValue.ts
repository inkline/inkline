import { Configuration, UserConfiguration } from '../../types';
import { parseFn } from './parseFn';
import { interpolate } from '../interpolate';

export interface ParseGenericComposedValueSetFn {
    (target: Record<string, string>, values: string[]): void;
}

export function parseGenericComposedValue<T = unknown> (
    config: Configuration,
    value: T,
    setFn: ParseGenericComposedValueSetFn
): Record<string, string> {
    const result: Record<string, string> = {};

    if (typeof value === 'function') {
        return parseGenericComposedValue(config, parseFn<T>(config, value as unknown as UserConfiguration.PropertyFn<T>), setFn);
    } else {
        setFn(result, interpolate(value, { theme: config.theme })
            .split(/\s+(\w+\([^(]+\)?|[#\w]+)/).filter((part) => part)
        );
    }

    return result;
}
