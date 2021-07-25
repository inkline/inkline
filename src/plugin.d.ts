import { Plugin } from 'vue'

export type IPrototypeFormFn = (...args: any[]) => any;

export interface IPrototypeConfig {
    colorMode: 'system' | 'light' | 'dark';
    locale: string;
    validateOn: string[];
    color: string;
    size: 'sm' | 'md' | 'lg';
    componentOptions: any;

    [key: string]: string | string[] | boolean;
}

export interface IPrototype {
    form: IPrototypeFormFn;
    options: IPrototypeConfig;
}

export type IInkline = Plugin;

declare const Inkline: IInkline;
declare const inklineGlobals: {
    prototype?: IPrototype
};

export { Inkline, inklineGlobals };
