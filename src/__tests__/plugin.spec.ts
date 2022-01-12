import {
    createPrototype,
    handleColorMode,
    Inkline,
    PrototypeConfig
} from '@inkline/inkline/plugin';
import * as inklineIcons from '@inkline/inkline/icons';
import { IButton } from '@inkline/inkline/components';
import { i18n } from '@inkline/inkline/i18n';

describe('Plugin', () => {
    describe('handleColorMode()', () => {
        it('should set given colorMode if not system color mode', () => {
            handleColorMode('color');

            expect(document.documentElement).toHaveClass('-color');
        });

        it('should set given light mode if system color mode', () => {
            const matchMediaSpy = jest.spyOn(global.window as any, 'matchMedia');
            matchMediaSpy.mockImplementation(() => ({
                matches: false,
                addEventListener: jest.fn()
            }));

            handleColorMode('system');

            expect(document.documentElement).toHaveClass('-light');

            jest.clearAllMocks();
        });

        it('should set given dark mode if system color mode', () => {
            const matchMediaSpy = jest.spyOn(global.window as any, 'matchMedia');
            matchMediaSpy.mockImplementation(() => ({
                matches: true,
                addEventListener: jest.fn()
            }));

            handleColorMode('system');

            expect(document.documentElement).toHaveClass('-dark');

            jest.clearAllMocks();
        });
    });

    describe('createPrototype()', () => {
        it('should create a new prototype with given options', () => {
            const options: PrototypeConfig = {
                colorMode: 'system',
                locale: 'en',
                validateOn: ['blur'],
                color: 'light',
                size: 'md',
                routerComponent: 'router-link',
                componentOptions: {}
            };
            const prototype = createPrototype(options);

            expect(prototype).toHaveProperty('form', expect.any(Function));
            expect(prototype).toHaveProperty('setLocale', expect.any(Function));
            Object.keys(options).forEach((key) => {
                expect(prototype.options).toHaveProperty(key, options[key]);
            });
        });
    });

    describe('Inkline', () => {
        describe('install()', () => {
            const createApp = () => ({
                add: jest.fn(),
                use: jest.fn(),
                provide: jest.fn(),
                component: jest.fn(),
                config: {
                    globalProperties: {}
                }
            });

            it('should register default inkline icons', () => {
                const app = createApp();

                (Inkline as any).install(app, {
                    icons: {
                        Icon: true
                    }
                });

                expect(app.provide).toHaveBeenCalledWith('inklineIcons', { Icon: true, ...inklineIcons });
            });

            it('should register options.components', () => {
                const app = createApp();

                (Inkline as any).install(app, {
                    components: {
                        IButton
                    }
                });

                expect(app.component).toHaveBeenCalledWith(IButton.name, IButton);
            });

            it('should add \'inkline\' class to body', () => {
                const app = createApp();

                (Inkline as any).install(app);

                expect(document.documentElement).toHaveClass('inkline');
            });

            it('should set color mode', () => {
                const app = createApp();

                (Inkline as any).install(app, { colorMode: 'dark' });

                expect(document.documentElement).toHaveClass('-dark');
            });

            it('should add color mode matchMedia event listener', (done) => {
                const app = createApp();

                (Inkline as any).install(app);

                const prototype = app.provide.mock.calls[0][1];
                prototype.options.colorMode = 'other';

                setTimeout(() => {
                    expect(document.documentElement).toHaveClass('-other');
                    done();
                });
            });

            it('should add color mode matchMedia event listener using addEventListener', () => {
                const matchMediaSpy = jest.spyOn(global.window as any, 'matchMedia');
                const addEventListener = jest.fn();
                matchMediaSpy.mockImplementation(() => ({
                    addEventListener
                }));

                const app = createApp();
                (Inkline as any).install(app);

                expect(matchMediaSpy).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
                expect(addEventListener).toHaveBeenCalled();

                jest.clearAllMocks();
            });

            it('should add color mode matchMedia event listener using addListener', () => {
                const matchMediaSpy = jest.spyOn(global.window as any, 'matchMedia');
                const addListener = jest.fn();
                matchMediaSpy.mockImplementation(() => ({
                    addListener
                }));

                const app = createApp();
                (Inkline as any).install(app);

                expect(matchMediaSpy).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
                expect(addListener).toHaveBeenCalled();

                jest.clearAllMocks();
            });

            describe('onDarkModeMediaQueryChange()', () => {
                it('should call handleColorMode() and set prefersColorScheme', () => {
                    const matchMediaSpy = jest.spyOn(global.window as any, 'matchMedia');
                    const addEventListener = jest.fn();
                    matchMediaSpy.mockImplementation(() => ({
                        matches: true,
                        addEventListener
                    }));

                    const app = createApp();
                    (Inkline as any).install(app, { colorMode: 'system' });

                    const prototype = app.provide.mock.calls[0][1];
                    prototype.options.colorMode = 'system';
                    const onDarkModeMediaQueryChange = addEventListener.mock.calls[0][1];
                    onDarkModeMediaQueryChange({ matches: true });

                    expect(prototype.options.prefersColorScheme).toEqual('dark');

                    jest.clearAllMocks();
                });

                it('should not call handleColorMode() if not system color mode', () => {
                    const matchMediaSpy = jest.spyOn(global.window as any, 'matchMedia');
                    const addEventListener = jest.fn();
                    matchMediaSpy.mockImplementation(() => ({
                        matches: false,
                        addEventListener
                    }));

                    const app = createApp();
                    (Inkline as any).install(app, { colorMode: 'light' });

                    const prototype = app.provide.mock.calls[0][1];
                    prototype.options.colorMode = 'light';
                    const onDarkModeMediaQueryChange = addEventListener.mock.calls[0][1];
                    onDarkModeMediaQueryChange({ matches: false });

                    expect(prototype.options.prefersColorScheme).toEqual('light');

                    jest.clearAllMocks();
                });
            });

            describe('prototype', () => {
                it('should be defined and provided', () => {
                    const app = createApp();

                    (Inkline as any).install(app);

                    const prototype = expect.objectContaining({
                        form: expect.any(Function),
                        setLocale: expect.any(Function),
                        options: expect.objectContaining({ color: '', size: '' })
                    });
                    expect(app.provide).toHaveBeenCalledWith('inkline', prototype);
                    expect((app.config.globalProperties as any).$inkline).toEqual(prototype);
                });

                describe('form()', () => {
                    it('should return newly initialized form schema', () => {
                        const app = createApp();

                        (Inkline as any).install(app);

                        const prototype = app.provide.mock.calls[0][1];

                        expect(prototype.form({})).toEqual({
                            dirty: false,
                            errors: [],
                            invalid: false,
                            pristine: true,
                            touched: false,
                            untouched: true,
                            valid: true,
                            validators: [],
                            value: ''
                        });
                    });
                });

                describe('setLocale()', () => {
                    it('should set chosen locale', () => {
                        const app = createApp();

                        (Inkline as any).install(app);

                        const prototype = app.provide.mock.calls[0][1];
                        prototype.setLocale('de');

                        expect(i18n.locale).toEqual('de');
                    });
                });
            });

            it('should not set color mode if isServer', () => {
                const windowSpy = jest.spyOn(global, 'window', 'get');
                windowSpy.mockImplementation(() => undefined as any);

                const app = createApp();

                (Inkline as any).install(app, { colorMode: 'isServer' });

                expect(document.documentElement).not.toHaveClass('-isServer');

                jest.clearAllMocks();
            });
        });
    });
});
