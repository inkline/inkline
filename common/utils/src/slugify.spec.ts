import { slugify } from './slugify';

describe('Helpers', () => {
    describe('slugify()', () => {
        it('should return string as lowercase', () => {
            expect(slugify('ABC')).toEqual('abc');
        });

        it('should replace spaces with dash', () => {
            expect(slugify('a bc')).toEqual('a-bc');
        });

        it('should remove non-word characters', () => {
            expect(slugify('a$bc')).toEqual('abc');
        });

        it('should replace multiple dashes with single dash', () => {
            expect(slugify('a--bc')).toEqual('a-bc');
        });

        it('should remove dash from start of text', () => {
            expect(slugify('-abc')).toEqual('abc');
        });

        it('should remove dash from end of text', () => {
            expect(slugify('abc-')).toEqual('abc');
        });
    });
});
