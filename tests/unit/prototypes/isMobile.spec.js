import { $isMobile } from 'inkline/prototypes/isMobile';

describe('Prototypes', () => {
    describe('$isMobile()', () => {
        it('should return true if navigator.userAgent matches Android', () => {
            global.navigator.userAgent = 'androidxmobile';

            expect($isMobile()).toEqual(true);
        });

        it('should return true if navigator.userAgent matches iPhone', () => {
            global.navigator.userAgent = 'iphone';

            expect($isMobile()).toEqual(true);
        });

        it('should return true if navigator.vendor matches Android', () => {
            global.navigator.vendor = 'androidxmobile';

            expect($isMobile()).toEqual(true);
        });

        it('should return true if navigator.vendor matches iPhone', () => {
            global.navigator.vendor = 'iphone';

            expect($isMobile()).toEqual(true);
        });

        it('should return true if window.opera exists and matches regExp', () => {
            global.window.opera = 'opera mini';

            expect($isMobile()).toEqual(true);
        });

        it('should return false if navigator doesn\'t match regExp', () => {
            global.navigator.userAgent = 'example';

            expect($isMobile()).toEqual(false);
        });
    });
});
