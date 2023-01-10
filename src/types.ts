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

export interface DevEnv {
    type: DevEnvType;
    configFile: string;
    initialized?: boolean;
}

export interface InitEnv {
    isTypescript: boolean;
    hasSrcDir: boolean;
    cwd: string;
}

export type PackageJsonSchema = JSONSchemaForNPMPackageJsonFiles;
