import { DevEnvType, DevEnv, InitEnv, PackageJsonSchema } from '../types';
import { addAfter, addAfterImports, addAfterRequires } from './addAfter';
import { getPluginCjsPreamble, getPluginTsPreamble } from './preamble';
import { resolve } from 'pathe';
import { existsSync } from 'fs';
import { capitalizeFirst } from '@grozav/utils';
import { readFile, writeFile } from 'fs/promises';
import {
    unknownDevEnvironment,
    defaultNuxtDevEnvConfigFileContents,
    defaultViteDevEnvConfigFileContents,
    defaultWebpackJsDevEnvConfigFileContents,
    defaultWebpackTsDevEnvConfigFileContents
} from '../constants';
import { Logger } from '@grozav/logger';
import { getIndent } from './getIndent';

export async function initDevEnvConfigFile(devEnv: DevEnv, { isTypescript }: InitEnv) {
    if (devEnv.type === 'nuxt') {
        await writeFile(devEnv.configFile, defaultNuxtDevEnvConfigFileContents);
    } else if (devEnv.type === 'vite') {
        await writeFile(devEnv.configFile, defaultViteDevEnvConfigFileContents);
    } else if (devEnv.type === 'webpack') {
        if (isTypescript) {
            await writeFile(devEnv.configFile, defaultWebpackTsDevEnvConfigFileContents);
        } else {
            await writeFile(devEnv.configFile, defaultWebpackJsDevEnvConfigFileContents);
        }
    }

    Logger.default(`Created ${devEnv.configFile}`);
}

export async function detectDevEnv(
    packageJson: PackageJsonSchema,
    { cwd, isTypescript }: InitEnv
): Promise<DevEnv> {
    const nuxtTs: DevEnv = {
        type: DevEnvType.Nuxt,
        configFile: resolve(cwd, 'nuxt.config.ts'),
        initialized: true
    };

    const nuxtJs: DevEnv = {
        type: DevEnvType.Nuxt,
        configFile: resolve(cwd, 'nuxt.config.js'),
        initialized: true
    };

    const viteTs: DevEnv = {
        type: DevEnvType.Vite,
        configFile: resolve(cwd, 'vite.config.ts'),
        initialized: true
    };

    const viteJs: DevEnv = {
        type: DevEnvType.Vite,
        configFile: resolve(cwd, 'vite.config.js'),
        initialized: true
    };

    const webpackTs: DevEnv = {
        type: DevEnvType.Webpack,
        configFile: resolve(cwd, 'webpack.config.ts'),
        initialized: true
    };

    const webpackJs: DevEnv = {
        type: DevEnvType.Webpack,
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

    if (inferredDevEnvironment) {
        Logger.success(
            `Detected ${capitalizeFirst(inferredDevEnvironment.type)}.js development environment`
        );
    } else {
        Logger.warning(
            'Could not determine development environment. Please see manual setup steps.'
        );
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
    const indent = getIndent(lines);

    const pluginsLineIndex = lines.findIndex((line) => pluginsRegEx.test(line));
    if (pluginsLineIndex !== -1) {
        const pluginsLine = lines[pluginsLineIndex];
        const isEmptyArray = /\[\s*],?$/.test(pluginsLine.trim());
        const isArrayClosing = /],?$/.test(pluginsLine.trim());
        lines[pluginsLineIndex] = pluginsLine.replace(
            pluginsRegEx,
            `plugins: [
${indent}${indent}${code},${!isEmptyArray && isArrayClosing ? `\n${indent}` : ''}${
                isArrayClosing ? indent : ''
            }`
        );
    } else {
        lines = addAfter(lines, exportLineIndex, [
            `${indent}plugins: [`,
            `${indent}${indent}${code},`,
            `${indent}],`
        ]);
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
        configFileLines = addAfterImports(
            configFileLines,
            getPluginTsPreamble(configFileLines, devEnv, env)
        );

        configFileLines = insertOrUpdateConfigReference(
            configFileLines,
            'plugins',
            `'@inkline/plugin/nuxt'`
        );
    } else if (devEnv.type === 'vite') {
        configFileLines = addAfterImports(configFileLines, [
            `import { inkline } from '@inkline/plugin/vite';`,
            ...getPluginTsPreamble(configFileLines, devEnv, env)
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
                ...getPluginTsPreamble(configFileLines, devEnv, env)
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

    await writeFile(devEnv.configFile, configFileLines.join('\n'), 'utf-8');

    Logger.default(`Updated ${devEnv.configFile}`);
}
