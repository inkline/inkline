import Vue from 'vue';
import { $isMobile } from '@inkline/inkline/src/prototypes/isMobile';

describe('Prototypes', () => {
    describe('$isMobile()', () => {
        it('should return false if SSR', () => {
            Vue.$isServer = true;

            expect($isMobile()).toEqual(false);

            Vue.$isServer = false;
        });

        it('should return false if window not defined', () => {
            const _window = global.window;
            global.window = undefined;

            expect($isMobile()).toEqual(false);

            global.window = _window;
        });

        it('should return true if navigator.userAgent matches Android', () => {
            global.navigator.userAgent = 'androidxmobile';

            expect($isMobile()).toEqual(true);
        });

        it('should return true if navigator.userAgent matches iPhone', () => {
            global.navigator.userAgent = 'iphone';

            expect($isMobile()).toEqual(true);
        });

        it('should return true if navigator.vendor matches Android', () => {
            global.navigator.userAgent = false;
            global.navigator.vendor = 'androidxmobile';

            expect($isMobile()).toEqual(true);
        });

        it('should return true if navigator.vendor matches iPhone', () => {
            global.navigator.userAgent = false;
            global.navigator.vendor = 'iphone';

            expect($isMobile()).toEqual(true);
        });

        it('should return true if window.opera exists and matches regExp', () => {
            global.navigator.userAgent = false;
            global.navigator.vendor = false;
            global.window.opera = 'opera mini';

            expect($isMobile()).toEqual(true);
        });

        it('should return false if navigator doesn\'t match regExp', () => {
            global.navigator.userAgent = 'example';

            expect($isMobile()).toEqual(false);
        });
    });
});
