import { ConfigurationContext, FnProperty, Theme } from '../../types';
import { parseFn } from './parseFn';
import { interpolate } from '../interpolate';

export function parseValue<ReturnType = unknown> (
    context: ConfigurationContext<Theme, ReturnType>
): ReturnType {
    const value = context.value;

    if (typeof value === 'function') {
        return parseFn(context as unknown as ConfigurationContext<Theme, FnProperty<ReturnType>>);
    } else if (typeof value === 'string') {
        return interpolate(value, { theme: context.theme }) as unknown as ReturnType;
    }

    return value;
}
