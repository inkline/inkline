import { isKey } from './isKey';

describe('Helpers', () => {
    describe('isKey()', () => {
        it('should return true if key pressed using key property', () => {
            expect(isKey('enter', { key: 'Enter' } as KeyboardEvent)).toEqual(true);
        });

        it('should return false if different key pressed using key property', () => {
            expect(isKey('enter', { key: 'Space' } as KeyboardEvent)).toEqual(false);
        });

        it('should return true if key pressed using keyIdentifier property', () => {
            expect(isKey('left', { keyIdentifier: 'Left' } as any)).toEqual(true);
        });

        it('should return false if different key pressed using keyIdentifier property', () => {
            expect(isKey('left', { keyIdentifier: 'Right' } as any)).toEqual(false);
        });

        it('should return true if key pressed using keyCode property', () => {
            expect(isKey('enter', { keyCode: 13 } as KeyboardEvent)).toEqual(true);
        });

        it('should return false if different key pressed using keyCode property', () => {
            expect(isKey('enter', { keyCode: 9 } as KeyboardEvent)).toEqual(false);
        });
    });
});
