import { PluginFunction } from 'vue'

export interface IPrototype {
    form: any;
    config: boolean;
}

export interface IInkline {
    install: PluginFunction<IPrototype>
}

declare const Inkline: IInkline;

export { Inkline };
