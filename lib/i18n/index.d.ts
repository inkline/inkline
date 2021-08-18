export * from './translate';
export interface InternationalizationMessages {
    [key: string]: string | string[] | (() => string) | ((params: any) => string) | InternationalizationMessages;
}
export interface Internationalization {
    locale: string;
    messages: {
        [key: string]: InternationalizationMessages;
    };
}
/**
 * Internationalization options
 */
export declare const i18n: Internationalization;
/**
 * Change internationalization locale
 *
 * @param locale
 */
export declare function setLocale(locale: string): void;
