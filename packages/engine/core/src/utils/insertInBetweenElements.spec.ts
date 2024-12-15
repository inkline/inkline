import { insertInBetweenElements } from './insertInBetweenElements';

describe('insertInBetweenElements', () => {
    it('should insert value between each element of the array', () => {
        expect(insertInBetweenElements([1, 2, 3], 0)).toEqual([1, 0, 2, 0, 3]);
    });

    it('should return an empty array when the input array is empty', () => {
        expect(insertInBetweenElements([], 0)).toEqual([]);
    });

    it('should handle single-element arrays correctly', () => {
        expect(insertInBetweenElements([1], 0)).toEqual([1]);
    });

    it('should work with string arrays and values', () => {
        expect(insertInBetweenElements(['a', 'b'], 'c')).toEqual(['a', 'c', 'b']);
    });
});
