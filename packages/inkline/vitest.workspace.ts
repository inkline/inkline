import { defineWorkspace } from 'vitest/config';
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import { storybookVuePlugin } from '@storybook/vue3-vite/vite-plugin';

// More info at: https://storybook.js.org/docs/writing-tests/vitest-plugin
export default defineWorkspace([
    'vite.config.ts',
    {
        extends: 'vite.config.ts',
        plugins: [
            // See options at: https://storybook.js.org/docs/writing-tests/vitest-plugin#storybooktest
            storybookTest(),
            storybookVuePlugin()
        ],
        test: {
            name: 'storybook',
            browser: {
                enabled: true,
                headless: true,
                name: 'chromium',
                provider: 'playwright'
            },
            // Make sure to adjust this pattern to match your stories files.
            include: ['**/*.stories.?(m)[jt]s?(x)'],
            setupFiles: ['./.storybook/vitest.setup.ts']
        }
    }
]);
