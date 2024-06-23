import * as shelljs from 'shelljs';
import { resolve } from 'path';

const setupDir = resolve(__dirname, '..');
const templatesDir = resolve(setupDir, 'templates');
const rootDir = resolve(setupDir, '..', '..', '..');
const packagesDir = resolve(rootDir, 'packages');
const e2eDir = resolve(packagesDir, 'e2e');
const e2eViteDir = resolve(e2eDir, 'vite');
const e2eNuxtDir = resolve(e2eDir, 'nuxt');

(async () => {
    /**
     * Cleanup
     */

    shelljs.rm('-rf', e2eViteDir);
    shelljs.rm('-rf', e2eNuxtDir);

    /**
     * Create Vite project
     */

    shelljs.exec(
        'pnpm create vue@latest --ts --router --pinia --jsx --force vite',
        {
            cwd: e2eDir,
            async: true
        },
        () => {
            const packageJsonPath = resolve(e2eViteDir, 'package.json');
            const packageJson = require(packageJsonPath);
            packageJson.name = '@inkline/e2e-vite';
            packageJson.dependencies['inkline'] = 'workspace:*';
            packageJson.scripts['init'] = 'inkline init --dev';
            require('fs').writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

            shelljs.exec('pnpm install', { cwd: e2eViteDir });
            shelljs.exec('pnpm run init', { cwd: e2eViteDir });
            shelljs.exec('pnpm install', { cwd: e2eViteDir });

            shelljs.cp('-r', resolve(templatesDir, 'common', '*'), resolve(e2eViteDir, 'src'));
            shelljs.cp('-r', resolve(templatesDir, 'vite', '*'), resolve(e2eViteDir, 'src'));
        }
    );

    /**
     * Create Nuxt project
     */

    shelljs.exec(
        'pnpm dlx nuxi@latest init --force --git-init false --package-manager pnpm nuxt',
        {
            cwd: e2eDir,
            async: true
        },
        () => {
            const packageJsonPath = resolve(e2eNuxtDir, 'package.json');
            const packageJson = require(packageJsonPath);
            packageJson.name = '@inkline/e2e-nuxt';
            packageJson.dependencies['inkline'] = 'workspace:*';
            packageJson.scripts['init'] = 'inkline init --dev';
            require('fs').writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

            shelljs.exec('pnpm install', { cwd: e2eNuxtDir });
            shelljs.exec('pnpm run init', { cwd: e2eNuxtDir });
            shelljs.exec('pnpm install', { cwd: e2eNuxtDir });

            shelljs.cp('-r', resolve(templatesDir, 'common', '*'), resolve(e2eNuxtDir));
            shelljs.cp('-r', resolve(templatesDir, 'nuxt', '*'), resolve(e2eNuxtDir));
        }
    );
})();
