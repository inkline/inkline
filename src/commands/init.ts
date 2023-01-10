import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { resolve } from 'pathe';
import { Logger } from '@grozav/logger';
import { defaultConfigFileContents, packageJsonExtension } from '../constants';
import {
    addPluginToDevEnvConfigFile,
    addPluginToEntryFile,
    detectDevEnv,
    detectEntryFile,
    extendPackageJson,
    initDevEnvConfigFile
} from '../helpers';
import type { InitEnv } from '../types';
import { Commands, DevEnvType, PackageJsonSchema } from '../types';
import { execShellCommand } from '../helpers/exec';

async function createConfigFile(env: InitEnv) {
    const outputFilePath = resolve(env.cwd, `inkline.config.${env.isTypescript ? 'ts' : 'js'}`);

    await writeFile(outputFilePath, defaultConfigFileContents);

    Logger.default(`Created ${outputFilePath}`);
}

export async function init(options: Commands.Init.Options) {
    try {
        const cwd = process.cwd();
        const hasSrcDir = existsSync(resolve(cwd, 'src'));
        const isTypescript = existsSync(resolve(cwd, 'tsconfig.json'));
        const initEnv: InitEnv = { cwd, hasSrcDir, isTypescript };

        const packageJsonPath = resolve(cwd, 'package.json');
        let packageJson: PackageJsonSchema = {};
        if (existsSync(packageJsonPath)) {
            packageJson = await extendPackageJson(packageJsonPath, packageJsonExtension);
        }

        if (!options.manual) {
            const devEnv = await detectDevEnv(packageJson, initEnv);
            if (!devEnv.initialized && devEnv.type !== DevEnvType.Unknown) {
                await initDevEnvConfigFile(devEnv, initEnv);
            }

            await addPluginToDevEnvConfigFile(devEnv, initEnv);

            if (devEnv.type !== DevEnvType.Nuxt) {
                const entryFile = await detectEntryFile(initEnv);
                if (entryFile) {
                    await addPluginToEntryFile(entryFile, initEnv);
                }
            }
        }

        await createConfigFile(initEnv);

        Logger.default('Installing dependencies...');

        await execShellCommand('npm install');

        Logger.success(Commands.Init.messages.success);
    } catch (error) {
        Logger.error(Commands.Init.messages.error);
        Logger.log(error);
    }
}
