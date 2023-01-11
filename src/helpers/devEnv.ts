import { DevEnv, DevEnvType, DevLibraryType, InitEnv, PackageJsonSchema } from '../types';
import { addAfter, addAfterImports, addAfterRequires } from './addAfter';
import { getPluginCjsPreamble, getPluginPreamble } from './preamble';
import { resolve } from 'pathe';
import { existsSync } from 'fs';
import { capitalizeFirst } from '@grozav/utils';
import { readFile, writeFile } from 'fs/promises';
import {
    defaultNuxtDevEnvConfigFileContents,
    defaultPrettierConfig,
    defaultViteDevEnvConfigFileContents,
    defaultWebpackJsDevEnvConfigFileContents,
    defaultWebpackTsDevEnvConfigFileContents,
    manualInstallationUrl,
    unknownDevEnvironment
} from '../constants';
import { Logger } from '@grozav/logger';
import prettier from 'prettier';

export async function initDevEnvConfigFile(
    devEnv: DevEnv,
    { isTypescript }: InitEnv
): Promise<boolean> {
    let configFileContents;
    if (devEnv.type === 'nuxt') {
        configFileContents = defaultNuxtDevEnvConfigFileContents;
    } else if (devEnv.type === 'vite') {
        configFileContents = defaultViteDevEnvConfigFileContents;
    } else if (devEnv.type === 'webpack') {
        if (isTypescript) {
            configFileContents = defaultWebpackTsDevEnvConfigFileContents;
        } else {
            configFileContents = defaultWebpackJsDevEnvConfigFileContents;
        }
    }

    if (configFileContents) {
        const formattedCode = prettier.format(configFileContents, defaultPrettierConfig);

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
            packageJson = JSON.parse(packageJsonContents);

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

export function insertOrUpdateConfigReference(
    lines: string[],
    configProperty: string,
    code: string
): string[] {
    const pluginsRegEx = new RegExp(`${configProperty}:\\s*\\[\\s*`);
    const exportLineIndex = lines.findIndex(
        (line) => line.includes('export default') || line.includes('module.exports')
    );

    const pluginsLineIndex = lines.findIndex((line) => pluginsRegEx.test(line));
    if (pluginsLineIndex !== -1) {
        const pluginsLine = lines[pluginsLineIndex];
        lines[pluginsLineIndex] = pluginsLine.replace(
            pluginsRegEx,
            `${configProperty}: [
        ${code},`
        );
    } else {
        const exportDefaultSplitRegEx = /.+\{/;
        if (exportDefaultSplitRegEx.test(lines[exportLineIndex])) {
            lines[exportLineIndex] = lines[exportLineIndex].replace(
                exportDefaultSplitRegEx,
                (match) => `${match}\n ${configProperty}: [\n${code}\n],`
            );
        } else {
            Logger.warning(
                `Could not automatically add "${configProperty}" property into config file`
            );
        }
    }

    return lines;
}

export async function addPluginToDevEnvConfigFile(devEnv: DevEnv, env: InitEnv) {
    if (!devEnv.configFile) {
        return;
    }

    const configFile = await readFile(devEnv.configFile, 'utf-8');
    let configFileLines = configFile.split('\n');

    if (devEnv.type === 'nuxt') {
        configFileLines = insertOrUpdateConfigReference(
            configFileLines,
            'plugins',
            `'@inkline/plugin/nuxt'`
        );
    } else if (devEnv.type === 'vite') {
        configFileLines = addAfterImports(configFileLines, [
            `import { inkline } from '@inkline/plugin/vite';`,
            ...getPluginPreamble(configFileLines, devEnv, env)
        ]);

        configFileLines = insertOrUpdateConfigReference(
            configFileLines,
            'plugins',
            'inkline(inklineConfig)'
        );
    } else if (devEnv.type === 'webpack') {
        if (env.isTypescript && devEnv.configFile.endsWith('.ts')) {
            configFileLines = addAfterImports(configFileLines, [
                `import { inkline } from '@inkline/plugin/webpack';`,
                ...getPluginPreamble(configFileLines, devEnv, env)
            ]);

            configFileLines = insertOrUpdateConfigReference(
                configFileLines,
                'plugins',
                'inkline(inklineConfig)'
            );
        } else {
            configFileLines = addAfterRequires(configFileLines, [
                `const inkline = require('@inkline/plugin/webpack');`,
                ...getPluginCjsPreamble(configFileLines, devEnv, env)
            ]);

            configFileLines = insertOrUpdateConfigReference(
                configFileLines,
                'plugins',
                'inkline(inklineConfig)'
            );
        }
    }

    const formattedCode = prettier.format(configFileLines.join('\n'), defaultPrettierConfig);

    await writeFile(devEnv.configFile, formattedCode, 'utf-8');

    Logger.default(`Updated ${devEnv.configFile}`);
}