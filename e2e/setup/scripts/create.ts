import shelljs from 'shelljs';
import fs from 'node:fs/promises';
import { resolve } from 'node:path';
import type { PackageJson } from 'type-fest';

const integration = process.argv[2] || '*';

const __dirname = new URL('.', import.meta.url).pathname;

const setupDir = resolve(__dirname, '..');
const templatesDir = resolve(setupDir, 'templates');
const e2eDir = resolve(setupDir, '..');
const e2eViteDir = resolve(e2eDir, 'vite');
const e2eNuxtDir = resolve(e2eDir, 'nuxt');

type PackageJSONImport = { default: Required<PackageJson> };

(() => {
    /**
     * Cleanup
     */

    shelljs.rm('-rf', e2eViteDir);
    shelljs.rm('-rf', e2eNuxtDir);

    /**
     * Create Vite project
     */

    if (integration === 'vite' || integration === '*') {
        shelljs.exec(
            'pnpm create vue@latest --ts --router --pinia --jsx --force vite',
            {
                cwd: e2eDir,
                async: true
            },
            async () => {
                const packageJsonPath = resolve(e2eViteDir, 'package.json');
                const { default: packageJson } = (await import(
                    packageJsonPath
                )) as PackageJSONImport;
                packageJson.name = '@inkline/e2e-vite';
                packageJson.dependencies['@inkline/cli'] = 'workspace:*';
                packageJson.scripts['init'] = 'inkline init --dev';
                packageJson.scripts['type-check'] = "echo 'Typecheck'";
                await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

                shelljs.exec('pnpm install --no-frozen-lockfile', { cwd: e2eViteDir });
                setTimeout(() => {
                    shelljs.exec('pnpm run init', { cwd: e2eViteDir });
                    shelljs.exec('pnpm install --no-frozen-lockfile', { cwd: e2eViteDir });
                }, 1000);

                shelljs.cp('-r', resolve(templatesDir, 'common', '*'), resolve(e2eViteDir, 'src'));
                shelljs.cp('-r', resolve(templatesDir, 'vite', '*'), resolve(e2eViteDir, 'src'));
            }
        );
    }

    /**
     * Create Nuxt project
     */

    if (integration === 'nuxt' || integration === '*') {
        shelljs.exec(
            'pnpm dlx nuxi@latest init --force --git-init false --package-manager pnpm nuxt',
            {
                cwd: e2eDir,
                async: true
            },
            async () => {
                const packageJsonPath = resolve(e2eNuxtDir, 'package.json');
                const { default: packageJson } = (await import(
                    packageJsonPath
                )) as PackageJSONImport;
                packageJson.name = '@inkline/e2e-nuxt';
                packageJson.dependencies['@inkline/cli'] = 'workspace:*';
                packageJson.scripts['init'] = 'inkline init --dev';
                await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

                shelljs.exec('pnpm install --no-frozen-lockfile', { cwd: e2eNuxtDir });
                setTimeout(() => {
                    shelljs.exec('pnpm run init', { cwd: e2eNuxtDir });
                    shelljs.exec('pnpm install --no-frozen-lockfile', { cwd: e2eNuxtDir });
                }, 1000);

                shelljs.cp('-r', resolve(templatesDir, 'common', '*'), resolve(e2eNuxtDir));
                shelljs.cp('-r', resolve(templatesDir, 'nuxt', '*'), resolve(e2eNuxtDir));
            }
        );
    }
})();
