/* eslint-disable @typescript-eslint/no-namespace */

import { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package';

export namespace Commands {
    export namespace Init {
        export const name = 'init';
        export const messages = {
            success: 'Inkline initialized successfully.',
            error: 'An unexpected error occurred.'
        };

        export interface Options {
            manual?: boolean;
            typescript?: boolean;
            type?: DevEnvType;
            dev?: boolean;
        }
    }

    export namespace Generate {
        export namespace Css {
            export const name = 'css';
            export const messages = {
                success: 'CSS generated successfully.',
                error: 'An unexpected error occurred.'
            };

            export interface Options {
                config?: string;
                outputDir?: string;
                extName: '.css';
            }
        }

        export namespace Scss {
            export const name = 'scss';
            export const messages = {
                success: 'SCSS generated successfully.',
                error: 'An unexpected error occurred.'
            };

            export interface Options {
                config?: string;
                outputDir?: string;
                extName: '.scss';
            }
        }
    }
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

export type PackageJsonSchema = JSONSchemaForNPMPackageJsonFiles;
