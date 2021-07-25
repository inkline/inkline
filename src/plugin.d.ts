import { Plugin } from 'vue'

export type IPrototypeFormFn = (...args: any[]) => any;

export interface IPrototypeConfig {
    variant: 'light' | 'dark';
    size: 'sm' | 'md' | 'lg';
    autodetectVariant: boolean;

    [key: string]: string | boolean;
}

export interface IPrototype {
    form: IPrototypeFormFn;
    config: IPrototypeConfig;
}

export type IInkline = Plugin;

declare const Inkline: IInkline;
declare const inklineGlobals: {
    prototype?: IPrototype
};

export { Inkline, inklineGlobals };
