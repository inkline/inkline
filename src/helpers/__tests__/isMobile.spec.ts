import { isMobile } from '@inkline/inkline/helpers';

describe('Helpers', () => {
    describe('isMobile()', () => {
        const windowSpy = jest.spyOn(global as any, 'window', 'get');
        let userAgent: string | undefined;
        let vendor: string | undefined;

        beforeAll(() => {
            Object.defineProperty(global.navigator, 'userAgent', { get () { return userAgent; } });
            Object.defineProperty(global.navigator, 'vendor', { get () { return vendor; } });
        });

        afterEach(() => {
            (isMobile as any).cachedValue = undefined;
            jest.restoreAllMocks();
        });

        it('should return false if isServer (window not defined)', () => {
            windowSpy.mockImplementation(() => undefined);

            expect(isMobile()).toEqual(false);
        });

        it('should return true if navigator.userAgent matches Android', () => {
            userAgent = 'androidxmobile';

            expect(isMobile()).toEqual(true);
        });

        it('should return true if navigator.userAgent matches iPhone', () => {
            userAgent = 'iphone';

            expect(isMobile()).toEqual(true);
        });

        it('should return true if navigator.vendor matches Android', () => {
            userAgent = undefined;
            vendor = 'androidxmobile';

            expect(isMobile()).toEqual(true);
        });

        it('should return true if navigator.vendor matches iPhone', () => {
            userAgent = undefined;
            vendor = 'iphone';

            expect(isMobile()).toEqual(true);
        });

        it('should return true if window.opera exists and matches regExp', () => {
            userAgent = undefined;
            vendor = undefined;
            (global as any).window.opera = 'opera mini';

            expect(isMobile()).toEqual(true);
        });

        it('should return false if navigator doesn\'t match regExp', () => {
            userAgent = 'example';

            expect(isMobile()).toEqual(false);
        });
    });
});
