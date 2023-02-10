import { onChangeColorMode, ColorModePlugin } from '@inkline/inkline/plugins';
import { createInklineService, defaultOptions } from '@inkline/inkline/plugin';

describe('ColorModePlugin', () => {
    describe('onChangeColorMode()', () => {
        it('should set given colorMode if not system color mode', () => {
            onChangeColorMode('color');

            expect(document.body).toHaveClass('color-theme');
        });

        it('should set given light mode if system color mode', () => {
            const matchMediaSpy = vi.spyOn(global.window, 'matchMedia');
            matchMediaSpy.mockImplementation(
                () =>
                    ({
                        matches: false,
                        addEventListener: vi.fn()
                    } as any)
            );

            onChangeColorMode('system');

            expect(document.body).toHaveClass('light-theme');

            vi.clearAllMocks();
        });

        it('should set given dark mode if system color mode', () => {
            const matchMediaSpy = vi.spyOn(global.window, 'matchMedia');
            matchMediaSpy.mockImplementation(
                () =>
                    ({
                        matches: true,
                        addEventListener: vi.fn()
                    } as any)
            );

            onChangeColorMode('system');

            expect(document.body).toHaveClass('dark-theme');

            vi.clearAllMocks();
        });
    });

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

        it('should set color mode', () => {
            const app = createApp();
            const inkline = createInklineService({ ...defaultOptions, colorMode: 'dark' });
            ColorModePlugin.install!(app as any, { inkline });

            expect(document.body).toHaveClass('dark-theme');
        });

        it('should add color mode matchMedia event listener', async () => {
            const app = createApp();
            const inkline = createInklineService({ ...defaultOptions });
            ColorModePlugin.install!(app as any, { inkline });

            inkline.options.colorMode = 'other';

            await new Promise((resolve) => setTimeout(resolve, 1));

            expect(document.body).toHaveClass('other-theme');
        });

        it('should add color mode matchMedia event listener using addEventListener', () => {
            const matchMediaSpy = vi.spyOn(global.window, 'matchMedia');
            const addEventListener = vi.fn();
            matchMediaSpy.mockImplementation(
                () =>
                    ({
                        addEventListener
                    } as any)
            );

            const app = createApp();
            const inkline = createInklineService({ ...defaultOptions });
            ColorModePlugin.install!(app as any, { inkline });

            expect(matchMediaSpy).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
            expect(addEventListener).toHaveBeenCalled();

            vi.clearAllMocks();
        });

        it('should add color mode matchMedia event listener using addListener', () => {
            const matchMediaSpy = vi.spyOn(global.window, 'matchMedia');
            const addListener = vi.fn();
            matchMediaSpy.mockImplementation(
                () =>
                    ({
                        addListener
                    } as any)
            );

            const app = createApp();
            const inkline = createInklineService({ ...defaultOptions });
            ColorModePlugin.install!(app as any, { inkline });

            expect(matchMediaSpy).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
            expect(addListener).toHaveBeenCalled();

            vi.clearAllMocks();
        });

        describe('onDarkModeMediaQueryChange()', () => {
            it('should call onChangeColorMode() =', () => {
                const matchMediaSpy = vi.spyOn(global.window, 'matchMedia');
                const addEventListener = vi.fn();
                matchMediaSpy.mockImplementation(
                    () =>
                        ({
                            matches: true,
                            addEventListener
                        } as any)
                );

                const app = createApp();
                const inkline = createInklineService({
                    ...defaultOptions,
                    colorMode: 'system'
                });
                ColorModePlugin.install!(app as any, { inkline });

                inkline.options.colorMode = 'system';
                const onDarkModeMediaQueryChange = addEventListener.mock.calls[0][1];
                onDarkModeMediaQueryChange({ matches: true });

                expect(document.body).toHaveClass('dark-theme');

                vi.clearAllMocks();
            });

            it('should not call onChangeColorMode() if not system color mode', () => {
                const matchMediaSpy = vi.spyOn(global.window, 'matchMedia');
                const addEventListener = vi.fn();
                matchMediaSpy.mockImplementation(
                    () =>
                        ({
                            matches: false,
                            addEventListener
                        } as any)
                );

                const app = createApp();
                const inkline = createInklineService({ ...defaultOptions, colorMode: 'light' });
                ColorModePlugin.install!(app as any, { inkline });

                inkline.options.colorMode = 'light';
                const onDarkModeMediaQueryChange = addEventListener.mock.calls[0][1];
                onDarkModeMediaQueryChange({ matches: true });

                expect(document.body).toHaveClass('light-theme');

                vi.clearAllMocks();
            });
        });
    });
});
