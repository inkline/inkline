import { getValueByPath, isFunction } from '@grozav/utils';
import { i18n } from '@inkline/inkline/i18n';

/**
 * Translate a string given its path and translation params
 *
 * @param path
 * @param params
 */
export function translate(path: string, params: { [key: string]: any } = {}): string {
    const valueByPath = getValueByPath(i18n.messages[i18n.locale], path);
    const string = (isFunction(valueByPath) ? valueByPath(params) : valueByPath) || path;

    return Object.keys(params).reduce((acc, key) => {
        return acc.replace(new RegExp(`{${key}}`, 'g'), `${params[key]}`);
    }, string);
}
