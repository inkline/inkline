import { DevEnv, DevEnvType, DevLibraryType, InitEnv, PackageJsonSchema } from '../types';
import { getPluginCjsPreamble, getPluginPreamble } from './preamble';
import { resolve } from 'pathe';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import {
    defaultNuxtDevEnvConfigFileContents,
    defaultPrettierConfig,
    defaultViteDevEnvConfigFileContents,
    defaultWebpackJsDevEnvConfigFileContents,
    defaultWebpackTsDevEnvConfigFileContents,
    unknownDevEnvironment
} from '../constants';
import { Logger } from '@grozav/logger';
import prettier from 'prettier';
import { addAfterImports, addAfterRequires } from './insert';
import { addFieldToDefaultExport, addImport } from './import';

export async function initDevEnvConfigFile(
    devEnv: DevEnv,
    { isTypescript }: InitEnv
): Promise<boolean> {
    let configFileContents;
    if (devEnv.type === DevEnvType.Nuxt) {
        configFileContents = defaultNuxtDevEnvConfigFileContents;
    } else if (devEnv.type === DevEnvType.Vite) {
        configFileContents = defaultViteDevEnvConfigFileContents;
    } else if (devEnv.type === DevEnvType.Webpack) {
        if (isTypescript) {
            configFileContents = defaultWebpackTsDevEnvConfigFileContents;
        } else {
            configFileContents = defaultWebpackJsDevEnvConfigFileContents;
        }
    }

    if (configFileContents) {
        const formattedCode = await prettier.format(configFileContents, defaultPrettierConfig);

        await writeFile(devEnv.configFile, formattedCode, 'utf-8');

        return true;
    }

    return false;
}

export async function detectDevEnv(
    packageJson: PackageJsonSchema,
    { cwd, isTypescript }: InitEnv
): Promise<DevEnv> {
    const nuxtTs: DevEnv = {
        type: DevEnvType.Nuxt,
        library: DevLibraryType.Vue,
        configFile: resolve(cwd, 'nuxt.config.ts'),
        initialized: true
    };

    const nuxtJs: DevEnv = {
        type: DevEnvType.Nuxt,
        library: DevLibraryType.Vue,
        configFile: resolve(cwd, 'nuxt.config.js'),
        initialized: true
    };

    const viteTs: DevEnv = {
        type: DevEnvType.Vite,
        library: DevLibraryType.Vue,
        configFile: resolve(cwd, 'vite.config.ts'),
        initialized: true
    };

    const viteJs: DevEnv = {
        type: DevEnvType.Vite,
        library: DevLibraryType.Vue,
        configFile: resolve(cwd, 'vite.config.js'),
        initialized: true
    };

    const webpackTs: DevEnv = {
        type: DevEnvType.Webpack,
        library: DevLibraryType.Vue,
        configFile: resolve(cwd, 'webpack.config.ts'),
        initialized: true
    };

    const webpackJs: DevEnv = {
        type: DevEnvType.Webpack,
        library: DevLibraryType.Vue,
        configFile: resolve(cwd, 'webpack.config.js'),
        initialized: true
    };

    /**
     * Try inferring development environment based on specific configuration file
     */

    const devEnvironments: DevEnv[] = [nuxtTs, nuxtJs, viteTs, viteJs, webpackTs, webpackJs];
    let inferredDevEnvironment = devEnvironments.find((devEnvironment) =>
        existsSync(devEnvironment.configFile)
    );

    /**
     * When the development environment config file is not found,
     * try determining it using package.json dependencies
     */

    if (!inferredDevEnvironment) {
        const packageJsonPath = resolve(cwd, 'package.json');
        let packageJson: PackageJsonSchema = {};
        if (existsSync(packageJsonPath)) {
            const packageJsonContents = await readFile(packageJsonPath, 'utf-8');
            packageJson = JSON.parse(packageJsonContents) as PackageJsonSchema;

            if (packageJson.dependencies?.nuxt || packageJson.devDependencies?.nuxt) {
                inferredDevEnvironment = {
                    ...(isTypescript ? nuxtTs : nuxtJs),
                    initialized: false
                };
            } else if (packageJson.dependencies?.vite || packageJson.devDependencies?.vite) {
                inferredDevEnvironment = {
                    ...(isTypescript ? viteTs : viteJs),
                    initialized: false
                };
            } else if (packageJson.dependencies?.webpack || packageJson.devDependencies?.webpack) {
                inferredDevEnvironment = {
                    ...(isTypescript ? webpackTs : webpackJs),
                    initialized: false
                };
            }
        }
    }

    return inferredDevEnvironment || unknownDevEnvironment;
}

export async function addPluginToDevEnvConfigFile(devEnv: DevEnv, env: InitEnv) {
    if (!devEnv.configFile) {
        return;
    }

    let configFile = await readFile(devEnv.configFile, 'utf-8');
    if (devEnv.type === DevEnvType.Nuxt) {
        configFile = addFieldToDefaultExport(configFile, 'modules', ["'@inkline/plugin/nuxt'"]);
    } else if (devEnv.type === DevEnvType.Vite) {
        configFile = addImport(configFile, {
            name: 'inkline',
            from: '@inkline/plugin/vite'
        });
        configFile = addAfterImports(configFile, getPluginPreamble(configFile, devEnv, env));
        configFile = addFieldToDefaultExport(configFile, 'plugins', ['inkline(inklineConfig)']);
    } else if (devEnv.type === DevEnvType.Webpack) {
        if (env.isTypescript && devEnv.configFile.endsWith('.ts')) {
            configFile = addImport(configFile, {
                name: 'inkline',
                from: '@inkline/plugin/webpack'
            });
            configFile = addAfterImports(configFile, getPluginPreamble(configFile, devEnv, env));
        } else {
            configFile = addAfterRequires(
                configFile,
                `const inkline = require('@inkline/plugin/webpack');`
            );
            configFile = getPluginCjsPreamble(configFile, devEnv, env);
        }
        configFile = addFieldToDefaultExport(configFile, 'plugins', ['inkline(inklineConfig)']);
    }

    const formattedCode = await prettier.format(configFile, defaultPrettierConfig);

    await writeFile(devEnv.configFile, formattedCode, 'utf-8');

    Logger.default(`Updated ${devEnv.configFile}`);
}
