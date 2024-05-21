import { extractIndexFiles } from './build';

describe('extractIndexFiles', () => {
    it('should correctly extract index files from single level paths', () => {
        const input = [
            { path: ['a', 'b'] },
            { path: ['a', 'c'] },
            { path: ['c', 'd'] },
            { path: ['e'] }
        ];
        const output = extractIndexFiles(input);
        expect(output).toEqual([
            { path: [], import: ['a', 'c', 'e'] },
            { path: ['a'], import: ['b', 'c'] },
            { path: ['c'], import: ['d'] }
        ]);
    });

    it('should correctly extract index files from multi level paths', () => {
        const input = [{ path: ['a', 'b', 'c'] }, { path: ['a', 'x', 'y'] }];
        const output = extractIndexFiles(input);
        expect(output).toEqual([
            { path: [], import: ['a'] },
            { path: ['a'], import: ['b', 'x'] },
            { path: ['a', 'b'], import: ['c'] },
            { path: ['a', 'x'], import: ['y'] }
        ]);
    });

    it('should handle empty input array', () => {
        const input = [];
        const output = extractIndexFiles(input);
        expect(output).toEqual([]);
    });

    it('should handle single element paths', () => {
        const input = [{ path: ['a'] }, { path: ['b'] }];
        const output = extractIndexFiles(input);
        expect(output).toEqual([{ path: [], import: ['a', 'b'] }]);
    });
});
