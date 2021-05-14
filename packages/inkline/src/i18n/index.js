import { en } from '@inkline/inkline/src/i18n/messages/en';
export * from '@inkline/inkline/src/i18n/translate';

/**
 * Internationalization options
 */
export const i18n = {
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
export function setLocale(locale) {
    i18n.locale = locale;
}
