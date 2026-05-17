import { getValueByPath, interpolate, isFunction } from '@inkline/utils';
import { i18n } from './instance';

type ScopedTranslateFn = (scope: Record<string, unknown>) => string;

/**
 * Translate a string given its path and translation scope
 *
 * @param path
 * @param scope
 */
export function translate(path: string, scope: Record<string, unknown> = {}): string {
    const template = getValueByPath<string | ScopedTranslateFn>(i18n.messages[i18n.locale], path);
    const string = (isFunction<ScopedTranslateFn>(template) ? template(scope) : template) || path;

    return interpolate(string, scope);
}
