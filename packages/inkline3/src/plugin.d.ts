import { PluginInstallFunction } from 'vue'

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

export interface IInkline {
    install: PluginInstallFunction<IPrototype>
}

declare const Inkline: IInkline;

export { Inkline };
