/**
 * @jest-environment node
 */

import {
    Inkline
} from '@inkline/inkline/plugin';

describe('SSR', () => {
    describe('Plugin', () => {
        describe('Inkline', () => {
            describe('install()', () => {
                const createApp = () => ({
                    add: vi.fn(),
                    use: vi.fn(),
                    provide: vi.fn(),
                    component: vi.fn(),
                    config: {
                        globalProperties: {
                            $inkline: {} as any
                        }
                    }
                });

                it('should not set color mode if isServer', () => {
                    const app = createApp();

                    (Inkline as any).install(app, { colorMode: 'server' });

                    expect(app.config.globalProperties.$inkline.options.colorMode).toEqual('server');
                });
            });
        });
    });
});
