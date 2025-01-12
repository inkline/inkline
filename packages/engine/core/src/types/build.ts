import type { OutputFile } from './generators';
import type { Themes } from './tokens';
import { DefinitionOptions } from './options';

export type ModuleOptions = object;

export type SetupFunction = (context: DefinitionOptions) => void;

export type ConfigurationOptions<T = unknown> = {
    outputDir?: string;
    manifest?: boolean;
    module?: 'css';
} & T;

export type Configuration<T = unknown> = {
    themes: Themes;
    files: OutputFile[];
    options: ConfigurationOptions<T>;
};
