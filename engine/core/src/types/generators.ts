import type { Context } from './context';

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
    typescript?: boolean;
    variants?: boolean;
};

export interface Generator<T> {
    (context: Context, options: T): OutputFile[];
}

export type RenameFn = (name: string) => string;
