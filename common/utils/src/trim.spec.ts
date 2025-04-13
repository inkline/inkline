import { trim } from './trim';

describe('Helpers', () => {
    describe('trim()', () => {
        it('should return empty string if provided string is undefined', () => {
            expect(trim('')).toEqual('');
        });

        it('should return string without leading whitespace', () => {
            expect(trim('   string')).toEqual('string');
        });

        it('should return string without trailing whitespace', () => {
            expect(trim('string   ')).toEqual('string');
        });

        it('should return string without leading and trailing whitespace', () => {
            expect(trim('   string   ')).toEqual('string');
        });
    });
});
