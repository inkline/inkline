import { extractUtilityClasses } from './extractUtilityClasses';

describe('extractUtilityClasses', () => {
    it('should extract a single utility class with no state', () => {
        const input = '_color:red';
        const result = extractUtilityClasses(input);
        expect(result).toEqual([{ name: 'color', value: 'red', state: 'default' }]);
    });

    it('should extract multiple utility classes without states', () => {
        const input = '_background:blue _color:white _border:solid';
        const result = extractUtilityClasses(input);
        expect(result).toEqual([
            { name: 'background', value: 'blue', state: 'default' },
            { name: 'color', value: 'white', state: 'default' },
            { name: 'border', value: 'solid', state: 'default' }
        ]);
    });

    it('should extract utility classes with states', () => {
        const input = '_hover:background:red _focus:border:blue';
        const result = extractUtilityClasses(input);
        expect(result).toEqual([
            { name: 'background', value: 'red', state: 'hover' },
            { name: 'border', value: 'blue', state: 'focus' }
        ]);
    });

    it('should mix stateful and stateless utility classes', () => {
        const input = '_hover:background:red _color:green';
        const result = extractUtilityClasses(input);
        expect(result).toEqual([
            { name: 'background', value: 'red', state: 'hover' },
            { name: 'color', value: 'green', state: 'default' }
        ]);
    });

    // @TODO Find a way to sanity check the regex
    it.skip('should ignore malformed utility definitions', () => {
        const input = '_background-:red _color:_hover:green _hover_background:red';
        const result = extractUtilityClasses(input);
        expect(result).toEqual([]);
    });

    it('should handle hyphenated values and names', () => {
        const input = '_font-size:xl _hover:font-weight:bold';
        const result = extractUtilityClasses(input);
        expect(result).toEqual([
            { name: 'font-size', value: 'xl', state: 'default' },
            { name: 'font-weight', value: 'bold', state: 'hover' }
        ]);
    });

    it('should return an empty array if no valid matches exist', () => {
        const input = 'random string without utilities';
        const result = extractUtilityClasses(input);
        expect(result).toEqual([]);
    });
});
