import type { OutputFile } from '@inkline/core';
import type { Themes } from '@inkline/core';

export type ModuleOptions = object;

export type ConfigurationOptions<T = unknown> = {
    outputDir?: string;
    manifest?: boolean;
    module?: 'scss';
} & T;

export type SetupFunction = () => void;

export type Configuration<T = unknown> = {
    themes: Themes;
    files: OutputFile[];
    options: ConfigurationOptions<T>;
};
