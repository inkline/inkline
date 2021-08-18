import { Plugin } from 'vue';
export interface PrototypeConfig {
    colorMode?: 'system' | 'light' | 'dark';
    locale?: string;
    validateOn?: string[];
    color?: string;
    size?: string;
    componentOptions?: any;
    components?: any;
    icons?: any;
    [key: string]: any;
}
export interface Prototype {
    form: (...args: any[]) => any;
    setLocale: (language: string) => any;
    options: PrototypeConfig;
}
export interface InklineGlobals {
    prototype?: Prototype;
}
/**
 * Easily accessible global Inkline object
 */
export declare const inklineGlobals: InklineGlobals;
/**
 * Inkline Vue.js plugin
 */
export declare const Inkline: Plugin;
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $inkline: Prototype;
    }
}
