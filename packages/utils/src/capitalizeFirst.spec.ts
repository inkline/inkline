import { capitalizeFirst } from './capitalizeFirst';

describe('Helpers', () => {
    describe('capitalizeFirst()', () => {
        it('should capitalize first character of string', () => {
            expect(capitalizeFirst('abc')).toEqual('Abc');
        });
    });
});
