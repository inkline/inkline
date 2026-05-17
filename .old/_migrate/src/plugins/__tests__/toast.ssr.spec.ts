/**
 * @jest-environment node
 */

import { ToastPlugin } from '@inkline/inkline/plugins';
import { createInklineService, defaultOptions } from '@inkline/inkline/plugin';

describe('ToastPlugin', () => {
    describe('install()', () => {
        const createApp = () => ({
            add: vi.fn(),
            use: vi.fn(),
            provide: vi.fn(),
            component: vi.fn(),
            config: {
                globalProperties: {}
            }
        });

        it('should install without errors', () => {
            const app = createApp();
            const inkline = createInklineService({ ...defaultOptions, colorMode: 'dark' });
            ToastPlugin.install!(app as any, { inkline });
        });
    });
});
