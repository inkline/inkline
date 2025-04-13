import { en } from './messages';
import type { Internationalization } from './types';

/**
 * Internationalization options
 */
export const i18n: Internationalization = {
    locale: 'en',
    messages: {
        en
    }
};

/**
 * Change internationalization locale
 *
 * @param locale
 */
export function setLocale(locale: string) {
    i18n.locale = locale;
}
