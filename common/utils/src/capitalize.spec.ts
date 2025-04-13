import { capitalize } from './capitalize';

describe('Helpers', () => {
    describe('capitalize()', () => {
        it('should capitalize first character of string', () => {
            expect(capitalize('abc')).toEqual('Abc');
        });
    });
});
