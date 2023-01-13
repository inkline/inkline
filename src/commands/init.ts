import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { resolve } from 'pathe';
import { Logger } from '@grozav/logger';
import {
    defaultConfigFileContents,
    defaultPrettierConfig,
    manualInstallationUrl,
    packageJsonExtension
} from '../constants';
import {
    addPluginToDevEnvConfigFile,
    addPluginToEntryFile,
    detectDevEnv,
    detectEntryFile,
    extendPackageJson,
    initDevEnvConfigFile,
    execShellCommand
} from '../helpers';
import type { InitEnv } from '../types';
import { Commands, DevEnvType, PackageJsonSchema } from '../types';
import prettier from 'prettier';
import { capitalizeFirst } from '@grozav/utils';

async function createConfigFile(env: InitEnv) {
    const outputFilePath = resolve(env.cwd, `inkline.config.${env.isTypescript ? 'ts' : 'js'}`);
    const formattedCode = prettier.format(defaultConfigFileContents, defaultPrettierConfig);

    await writeFile(outputFilePath, formattedCode);

    Logger.default(`Created ${outputFilePath}`);
}

export async function init(options: Commands.Init.Options) {
    try {
        Logger.info('Initializing Inkline');
        let initSuccessful = true;

        const cwd = process.cwd();
        const hasSrcDir = existsSync(resolve(cwd, 'src'));
        const isTypescript = existsSync(resolve(cwd, 'tsconfig.json'));
        const initEnv: InitEnv = { cwd, hasSrcDir, isTypescript };

        const packageJsonPath = resolve(cwd, 'package.json');
        const packageJsonFound = existsSync(packageJsonPath);
        let packageJson: PackageJsonSchema = {};
        if (packageJsonFound) {
            Logger.success(`Detected package.json file.`);
            packageJson = await extendPackageJson(packageJsonPath, packageJsonExtension);
            Logger.default(`Updated ${packageJsonPath}`);
        } else {
            initSuccessful = false;
            Logger.warning(`Could not find a package.json file.`);
        }

        if (!options.manual) {
            const devEnv = await detectDevEnv(packageJson, initEnv);

            if (devEnv.type === DevEnvType.Unknown) {
                Logger.warning(`Could not determine development environment.`);
                initSuccessful = false;
            } else {
                Logger.success(
                    `Detected ${capitalizeFirst(devEnv.type)}.js development environment`
                );
            }

            if (!devEnv.initialized && devEnv.type !== DevEnvType.Unknown) {
                const created = await initDevEnvConfigFile(devEnv, initEnv);
                if (created) {
                    Logger.default(`Created ${devEnv.configFile}`);
                }
            }

            await addPluginToDevEnvConfigFile(devEnv, initEnv);

            if (devEnv.type !== DevEnvType.Nuxt) {
                const entryFile = await detectEntryFile(initEnv);
                if (entryFile) {
                    const updated = await addPluginToEntryFile(entryFile, initEnv);

                    if (updated) {
                        Logger.default(`Updated ${entryFile}`);
                    } else {
                        Logger.warning(`Could not determine entry file.`);
                    }
                } else {
                    Logger.warning(`Could not determine entry file.`);
                    initSuccessful = false;
                }
            }
        }

        await createConfigFile(initEnv);

        if (packageJsonFound) {
            Logger.default('Installing dependencies...');

            await execShellCommand('npm install');
        }

        if (initSuccessful) {
            Logger.success(Commands.Init.messages.success);
        } else {
            Logger.warning(
                `Inkline partially initialized. Please see manual setup steps: ${manualInstallationUrl}`
            );
        }
    } catch (error) {
        Logger.error(Commands.Init.messages.error);
        Logger.log(error);
    }
}
