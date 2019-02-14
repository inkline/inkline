import { isVisible } from '@inkline/inkline/helpers/isVisible';

describe('Helpers', () => {
    describe('isVisible()', () => {
        it('should return false if element not defined', () => {
            expect(isVisible(undefined)).toEqual(false);
        });

        it('should return false if not height offset, width offset or client rects', () => {
            const element = { getClientRects: () => [] };

            expect(isVisible(element)).toEqual(false);
        });

        it('should return true if height offset', () => {
            const element = { offsetHeight: 10 };

            expect(isVisible(element)).toEqual(true);
        });

        it('should return true if width offset', () => {
            const element = { offsetWidth: 10 };

            expect(isVisible(element)).toEqual(true);
        });

        it('should return true if client rects', () => {
            const element = { getClientRects: () => [1] };

            expect(isVisible(element)).toEqual(true);
        });
    });
});
