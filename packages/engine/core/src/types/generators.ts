import { Configuration } from './build';

export type OutputFile = {
    id?: string;
    path: string;
    content: string;
    options?: {
        append?: boolean;
        prepend?: boolean;
    };
};

export type GeneratorAddon = 'layers' | 'tailwindcss' | 'normalizecss';
export type GeneratorAddonLayersOptions = string[];
export type GeneratorAddonTailwindCSSOptions = {
    prefix?: string;
};

export type GeneratorOptions = {
    addons?: GeneratorAddon[];
    tailwindcss?: GeneratorAddonTailwindCSSOptions;
    layers?: GeneratorAddonLayersOptions;
};

export interface Generator<T> {
    (configuration: Configuration<T>): OutputFile[];
}
