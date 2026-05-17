import { hashString } from './hashString';

describe('Helpers', () => {
    describe('hashString()', () => {
        it('should return 0 for 0-length string', () => {
            expect(hashString('')).toEqual(0);
        });

        it('should return ascii code for for 1-length string', () => {
            expect(hashString('a')).toEqual(97);
        });

        it('should return hash for for n-length string', () => {
            expect(hashString('abc')).toEqual(96354);
        });
    });
});
