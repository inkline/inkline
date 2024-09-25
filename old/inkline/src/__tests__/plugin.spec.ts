import type { InklineOptions, InklinePluginOptions } from '@inkline/inkline/plugin';
import { createInklineService, Inkline } from '@inkline/inkline/plugin';
import { InklineKey } from '@inkline/inkline/constants';
import { IButton } from '@inkline/inkline/components';
import { i18n } from '@inkline/inkline/i18n';

describe('Plugin', () => {
    describe('createInklineGlobals()', () => {
        it('should create a new prototype with given options', () => {
            const options: InklineOptions = {
                colorModeStrategy: 'localStorage',
                renderMode: 'universal',
                colorMode: 'system',
                locale: 'en',
                validateOn: ['blur'],
                color: 'light',
                size: 'md',
                routerComponent: 'router-link',
                componentOptions: {}
            };
            const prototype = createInklineService(options as InklinePluginOptions);

            expect(prototype).toHaveProperty('form');
            expect(prototype).toHaveProperty('setLocale');
            Object.keys(options).forEach((key) => {
                expect(prototype.options).toHaveProperty(key, options[key]);
            });
        });
    });

    describe('Inkline', () => {
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

            it('should register options.components', () => {
                const app = createApp();

                Inkline.install!(app as any, {
                    components: {
                        IButton
                    }
                });

                expect(app.component).toHaveBeenCalledWith(IButton.name, IButton);
            });

            it("should add 'inkline' class to body", () => {
                const app = createApp();

                Inkline.install!(app as any);

                expect(document.body).toHaveClass('inkline');
            });

            describe('prototype', () => {
                it('should be defined and provided', () => {
                    const app = createApp();

                    Inkline.install!(app as any);

                    const prototype = expect.objectContaining({
                        form: expect.any(Function),
                        setLocale: expect.any(Function),
                        options: expect.objectContaining({ color: '', size: '' })
                    });
                    expect(app.provide).toHaveBeenCalledWith(InklineKey, prototype);
                    expect((app.config.globalProperties as any).$inkline).toEqual(prototype);
                });

                describe('form()', () => {
                    it('should return newly initialized form schema', () => {
                        const app = createApp();

                        Inkline.install!(app as any);

                        const prototype = app.provide.mock.calls[0][1];

                        expect(prototype.form({})).toEqual({
                            dirty: false,
                            errors: [],
                            invalid: false,
                            pristine: true,
                            touched: false,
                            untouched: true,
                            valid: true
                        });
                    });
                });

                describe('setLocale()', () => {
                    it('should set chosen locale', () => {
                        const app = createApp();

                        Inkline.install!(app as any);

                        const prototype = app.provide.mock.calls[0][1];
                        prototype.setLocale('de');

                        expect(i18n.locale).toEqual('de');
                    });
                });
            });
        });
    });
});
