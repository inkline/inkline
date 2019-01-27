import { isKey } from '@inkline/inkline/helpers/isKey';

describe('Helpers', () => {
    describe('isKey()', () => {
        it('should return true if key pressed using key property', () => {
            expect(isKey('enter', { key: 'Enter' })).toEqual(true);
        });

        it('should return false if different key pressed using key property', () => {
            expect(isKey('enter', { key: 'Space' })).toEqual(false);
        });

        it('should return true if key pressed using keyIdentifier property', () => {
            expect(isKey('left', { keyIdentifier: 'Left' })).toEqual(true);
        });

        it('should return false if different key pressed using keyIdentifier property', () => {
            expect(isKey('left', { keyIdentifier: 'Right' })).toEqual(false);
        });

        it('should return true if key pressed using keyCode property', () => {
            expect(isKey('enter', { keyCode: 13 })).toEqual(true);
        });

        it('should return false if different key pressed using keyCode property', () => {
            expect(isKey('enter', { keyCode: 9 })).toEqual(false);
        });
    });
});
