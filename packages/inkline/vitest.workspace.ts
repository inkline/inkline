import { defineWorkspace } from 'vitest/config';
import { storybookTest } from '@storybook/experimental-addon-vitest/plugin';

export default defineWorkspace([
    'vite.config.ts',
    {
        extends: 'vite.config.ts',
        plugins: [storybookTest()],
        test: {
            include: ['**/*.stories.?(m)[jt]s?(x)'],
            browser: {
                enabled: true,
                name: 'chromium',
                provider: 'playwright',
                headless: true
            },
            // Disabling isolation is faster and is similar to how tests are isolated in storybook itself.
            // Consider removing this if you are seeing problems with your tests.
            isolate: false,
            setupFiles: ['./.storybook/vitest.setup.ts']
        }
    }
]);
