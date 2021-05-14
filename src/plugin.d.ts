import { Plugin } from 'vue'

export type IPrototypeFormFn = (...args: any[]) => any;

export interface IPrototypeConfig {
    variant: 'light' | 'dark';
    autodetectVariant: boolean;

    [key: string]: string | boolean;
}

export interface IPrototype {
    form: IPrototypeFormFn;
    config: IPrototypeConfig;
}

export type IInkline = Plugin;

declare const Inkline: IInkline;

export { Inkline };
