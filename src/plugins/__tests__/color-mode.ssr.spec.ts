/**
 * @jest-environment node
 */

import { ColorModePlugin } from '@inkline/inkline/plugins';
import { createInklineService, defaultOptions } from '@inkline/inkline/plugin';

describe('ColorModePlugin', () => {
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

        it('should not set color mode if isServer', () => {
            const inkline = createInklineService({ ...defaultOptions, colorMode: 'server' });
            const app = createApp();

            ColorModePlugin.install!(app as any, { inkline });

            expect(inkline.options.colorMode).toEqual('server');
        });
    });
});
