import { filterKeys } from './filterKeys';

describe('Helpers', () => {
    describe('filterKeys()', () => {
        it('should return object with only allowlisted string keys', () => {
            expect(filterKeys({ a: 1, b: 2, c: 3 }, { allowlist: ['a', 'b'] })).toEqual({
                a: 1,
                b: 2
            });
        });

        it('should return object with only allowlisted RegEx keys', () => {
            expect(filterKeys({ a: 1, b: 2, c: 3 }, { allowlist: [/[ac]/] })).toEqual({
                a: 1,
                c: 3
            });
        });

        it('should return object without denylisted string keys', () => {
            expect(filterKeys({ a: 1, b: 2, c: 3 }, { denylist: ['a', 'b'] })).toEqual({ c: 3 });
        });

        it('should return object without denylisted RegEx keys', () => {
            expect(filterKeys({ a: 1, b: 2, c: 3 }, { denylist: [/[ac]/] })).toEqual({ b: 2 });
        });

        it('should return object with allowlisted keys, but without denylisted keys', () => {
            expect(
                filterKeys({ a: 1, b: 2, c: 3 }, { allowlist: ['a', 'c'], denylist: ['a'] })
            ).toEqual({ c: 3 });
        });
    });
});
