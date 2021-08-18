import { en } from './messages/en';
export * from './translate';
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
//# sourceMappingURL=index.js.map