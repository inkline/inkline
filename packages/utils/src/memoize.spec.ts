import { memoize } from './memoize';

const fn = (add: number) => Math.random() + add;

describe('Helpers', () => {
    describe('memoize()', () => {
        it('should return memoized function', () => {
            expect(memoize(fn)).not.toEqual(fn);
        });

        it('should return same value for same input', () => {
            const memoizedFn = memoize(fn);
            const result = memoizedFn(1);

            expect(memoizedFn(1)).toEqual(result);
            expect(memoizedFn(1)).toEqual(result);
            expect(memoizedFn(1)).toEqual(result);
            expect(memoizedFn(1)).toEqual(result);
        });
    });
});
