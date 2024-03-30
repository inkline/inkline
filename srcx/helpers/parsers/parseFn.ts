import { ConfigurationContext, FnProperty, Theme } from '../../types';
import { parseValue } from './parseValue';

export function parseFn<ReturnType = unknown>(
    context: ConfigurationContext<Theme, FnProperty<ReturnType>>
): ReturnType {
    const value = context.value;

    return parseValue({
        ...context,
        value: value({ theme: context.theme }) as unknown as string
    }) as unknown as ReturnType;
}
