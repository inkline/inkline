import { ConfigurationContext, Theme } from '../../types';
import { parseValue } from './parseValue';

export interface ParseGenericComposedValueSetFn<ValueType = Record<string, string>> {
    (target: ValueType, values: string[]): void;
}

export function parseGenericComposedValue<ReturnType = unknown> (
    context: ConfigurationContext<Theme, string>,
    setFn: ParseGenericComposedValueSetFn<ReturnType>
): ReturnType {
    const value = parseValue(context);
    const result: ReturnType = {} as unknown as ReturnType;

    setFn(result, value.split(/\s+([\w-]+\([^(]+\)?|[#\w-]+)/).filter((part) => part));

    return result;
}
