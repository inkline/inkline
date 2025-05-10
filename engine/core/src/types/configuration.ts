import type { GeneratorOptions } from './generators';
import { DefinitionOptions } from './options';
import { Context } from './context';

export type ModuleOptions = object;

export type SetupFunction = (context: DefinitionOptions) => void;

export type Options<T = unknown> = {
    configFile?: string;
    outputDir?: string;
    manifest?: boolean;
    module?: 'css';
    generator?: GeneratorOptions;
} & T;

export type Configuration<T = unknown> = {
    context: Context;
    options: Options<T>;
};
