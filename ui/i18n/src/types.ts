export interface InternationalizationMessages {
    [key: string]:
        | string
        | string[]
        | (() => string)
        | ((params: any) => string)
        | InternationalizationMessages;
}

export interface Internationalization {
    locale: string;
    messages: {
        [key: string]: InternationalizationMessages;
    };
}
