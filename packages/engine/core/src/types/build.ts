import type { OutputFile } from './generators';
import type { Themes } from './tokens';
import type { Context } from './context';

export type ModuleOptions = object;

export type ConfigurationOptions<T = unknown> = {
    outputDir?: string;
    manifest?: boolean;
    module?: 'scss';
} & T;

export type SetupFunction = (context: Context) => void;

export type Configuration<T = unknown> = {
    themes: Themes;
    files: OutputFile[];
    options: ConfigurationOptions<T>;
};
