import { isVisible } from './isVisible';

describe('Helpers', () => {
    describe('isVisible()', () => {
        it('should return false if element not defined', () => {
            expect((isVisible as any)(undefined)).toEqual(false);
        });

        it('should return false if not height offset, width offset or client rects', () => {
            const element = { getClientRects: () => [] } as any;

            expect(isVisible(element)).toEqual(false);
        });

        it('should return true if height offset', () => {
            const element = { offsetHeight: 10 } as any;

            expect(isVisible(element)).toEqual(true);
        });

        it('should return true if width offset', () => {
            const element = { offsetWidth: 10 } as any;

            expect(isVisible(element)).toEqual(true);
        });

        it('should return true if client rects', () => {
            const element = { getClientRects: () => [1] } as any;

            expect(isVisible(element)).toEqual(true);
        });
    });
});
