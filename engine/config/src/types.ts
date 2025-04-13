import type { OutputFile, Themes } from '@inkline/core';

export type ModuleOptions = object;

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

export type UserBuildOptions = ConfigurationOptions & {
    configFile?: string;
};

export type BuildOptions = Required<UserBuildOptions> & {
    configDir: string;
    configExtName: string;
};
