declare const i18n: {
    locale: string;
    [key: string]: {
        validation: {
            [key: string]: string;
        };
    } | string;
};

declare function setLocale(locale: string): void;

export * from './translate';
export { i18n, setLocale };
