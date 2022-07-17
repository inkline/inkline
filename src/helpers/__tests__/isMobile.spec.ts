import { isMobile } from '@inkline/inkline/helpers';

describe('Helpers', () => {
    describe('isMobile()', () => {
        const windowSpy = vi.spyOn(global as any, 'window', 'get');
        const navigatorSpy = vi.spyOn(global as any, 'navigator', 'get');

        afterEach(() => {
            (isMobile as any).cachedValue = undefined;

            windowSpy.mockRestore();
            navigatorSpy.mockRestore();
        });

        it('should return false if isServer (window not defined)', () => {
            windowSpy.mockImplementation(() => undefined);

            expect(isMobile()).toEqual(false);
        });

        it('should return true if navigator.userAgent matches Android', () => {
            windowSpy.mockImplementation(() => ({}));
            navigatorSpy.mockImplementation(() => ({ userAgent: 'androidxmobile' }));

            expect(isMobile()).toEqual(true);
        });

        it('should return true if navigator.userAgent matches iPhone', () => {
            windowSpy.mockImplementation(() => ({}));
            navigatorSpy.mockImplementation(() => ({ userAgent: 'iphone' }));

            expect(isMobile()).toEqual(true);
        });

        it('should return true if navigator.vendor matches Android', () => {
            windowSpy.mockImplementation(() => ({}));
            navigatorSpy.mockImplementation(() => ({ userAgent: undefined, vendor: 'androidxmobile' }));

            expect(isMobile()).toEqual(true);
        });

        it('should return true if navigator.vendor matches iPhone', () => {
            windowSpy.mockImplementation(() => ({}));
            navigatorSpy.mockImplementation(() => ({ userAgent: undefined, vendor: 'iphone' }));

            expect(isMobile()).toEqual(true);
        });

        it('should return true if window.opera exists and matches regExp', () => {
            windowSpy.mockImplementation(() => ({ opera: 'opera mini' }));
            navigatorSpy.mockImplementation(() => ({ userAgent: undefined, vendor: undefined }));

            (global as any).window.opera = 'opera mini';

            expect(isMobile()).toEqual(true);
        });

        it('should return false if navigator doesn\'t match regExp', () => {
            windowSpy.mockImplementation(() => ({}));
            navigatorSpy.mockImplementation(() => ({ userAgent: 'example' }));

            expect(isMobile()).toEqual(false);
        });
    });
});
