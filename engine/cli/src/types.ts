import { PackageJson } from "type-fest";

export type InitCommandOptions = {
    manual?: boolean;
    typescript?: boolean;
    type?: DevEnvType;
    dev?: boolean;
};

export type GenerateCommandOptions = {
    config?: string;
    outputDir?: string;
    extName: '.scss';
}

export enum DevEnvType {
    Nuxt = 'nuxt',
    Vite = 'vite',
    Webpack = 'webpack',
    Unknown = 'unknown'
}

export enum DevLibraryType {
    Vue = 'vue',
    Unknown = 'unknown'
}

export interface DevEnv {
    type: DevEnvType;
    library: DevLibraryType;
    configFile: string;
    initialized?: boolean;
}

export interface InitEnv {
    isTypescript: boolean;
    hasSrcDir: boolean;
    cwd: string;
}

export interface ImportFileMeta {
    name: string | string[];
    from: string;
    type?: boolean;
}

export type PackageJsonSchema = PackageJson;
