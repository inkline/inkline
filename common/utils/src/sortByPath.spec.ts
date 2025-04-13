import { sortByPath } from './sortByPath';

describe('Helpers', () => {
    describe('sortByPath()', () => {
        it('should return a sorting function', () => {
            expect(sortByPath('value')).toEqual(expect.any(Function));
        });

        describe('sortByPath(path)(a,b)', () => {
            it('should return 1 if a[path] > b[path]', () => {
                const list = [{ value: 2 }, { value: 1 }];

                expect(sortByPath('value')(list[0], list[1])).toEqual(1);
            });

            it('should return -1 if a[path] < b[path]', () => {
                const list = [{ value: 1 }, { value: 2 }];

                expect(sortByPath('value')(list[0], list[1])).toEqual(-1);
            });

            it('should return 0 if a[path] === b[path]', () => {
                const list = [{ value: 1 }, { value: 1 }];

                expect(sortByPath('value')(list[0], list[1])).toEqual(0);
            });
        });
    });
});
