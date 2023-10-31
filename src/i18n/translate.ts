import { getValueByPath, isFunction } from '@grozav/utils';
import { i18n } from '@inkline/inkline/i18n';
import { interpolate } from '@inkline/inkline/utils';

/**
 * Translate a string given its path and translation scope
 *
 * @param path
 * @param scope
 */
export function translate(path: string, scope: Record<string, any> = {}): string {
    const template = getValueByPath(i18n.messages[i18n.locale], path);
    const string = (isFunction(template) ? template(scope) : template) || path;

    return interpolate(string, scope);
}
