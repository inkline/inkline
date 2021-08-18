import { en } from '@inkline/inkline/src/i18n/messages/en';
export * from '@inkline/inkline/src/i18n/translate';

export interface InternationalizationMessages {
    [key: string]: string | string[] | (() => string) | ((params: any) => string) | InternationalizationMessages;
}

export interface Internationalization {
    locale: string;
    messages: {
        [key: string]: InternationalizationMessages
    }
}

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
