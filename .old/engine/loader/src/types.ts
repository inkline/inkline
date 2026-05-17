import type { Context, Options } from '@inkline/core';

export type UserBuildOptions = Options & {
    context?: Context;
};

export type BuildOptions = Required<UserBuildOptions> & {
    configPath: string;
    configDir: string;
    configBasename: string;
    configExtname: string;
};
