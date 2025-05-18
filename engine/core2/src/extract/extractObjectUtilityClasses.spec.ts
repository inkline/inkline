import {
    extractObjectUtilityClasses,
    extractHelperFunctionUtilityClasses,
    extractVariantPropertyUtilityClasses,
    extractCompiledVariantPropertyUtilityClasses
} from './extractObjectUtilityClasses';

describe('extractObjectUtilityClasses', () => {
    it('should extract a single key-value pair', () => {
        const input = `{ theme: 'dark' }`;
        const result = extractObjectUtilityClasses(input);
        expect(result).toEqual([{ name: 'theme', value: 'dark', state: 'default' }]);
    });

    it('should extract multiple key-value pairs from object', () => {
        const input = `{ theme: 'dark', size: 'lg', color: 'blue' }`;
        const result = extractObjectUtilityClasses(input);
        expect(result).toEqual([
            { name: 'theme', value: 'dark', state: 'default' },
            { name: 'size', value: 'lg', state: 'default' },
            { name: 'color', value: 'blue', state: 'default' }
        ]);
    });

    it('should extract multiple key-value pairs from variant object with state', () => {
        const input = `{ theme: 'dark', size: 'lg', color: 'blue' }`;
        const result = extractObjectUtilityClasses(input, 'hover');
        expect(result).toEqual([
            { name: 'theme', value: 'dark', state: 'hover' },
            { name: 'size', value: 'lg', state: 'hover' },
            { name: 'color', value: 'blue', state: 'hover' }
        ]);
    });

    it('should ignore malformed variant definitions', () => {
        const input = `{ valid: value }`;
        const result = extractObjectUtilityClasses(input);
        expect(result).toEqual([]);
    });

    it('should handle keys and values with quotes and dashes', () => {
        const input = `{ 'layout-style': 'full-width', "text": "title" }`;
        const result = extractObjectUtilityClasses(input);
        expect(result).toEqual([
            { name: 'layout-style', value: 'full-width', state: 'default' },
            { name: 'text', value: 'title', state: 'default' }
        ]);
    });

    it('should return an empty array when no matches are found', () => {
        const input = `<div class="no-variant-here"></div>`;
        const result = extractObjectUtilityClasses(input);
        expect(result).toEqual([]);
    });
});

describe('extractVariantPropertyUtilityClasses', () => {
    it('should extract a single key-value pair', () => {
        const input = `:variant="{ theme: 'dark' }"`;
        const result = extractVariantPropertyUtilityClasses(input);
        expect(result).toEqual([{ name: 'theme', value: 'dark', state: 'default' }]);
    });

    it('should extract multiple key-value pairs from one object', () => {
        const input = `:variant="{ theme: 'dark', size: 'lg', color: 'blue' }"`;
        const result = extractVariantPropertyUtilityClasses(input);
        expect(result).toEqual([
            { name: 'theme', value: 'dark', state: 'default' },
            { name: 'size', value: 'lg', state: 'default' },
            { name: 'color', value: 'blue', state: 'default' }
        ]);
    });

    it('should extract key-value pairs from multiple variant objects', () => {
        const input = `
      :variant="{ variant: 'outlined' }"
      :variant="{ size: 'small', mode: 'ghost' }"
    `;
        const result = extractVariantPropertyUtilityClasses(input);
        expect(result).toEqual([
            { name: 'variant', value: 'outlined', state: 'default' },
            { name: 'size', value: 'small', state: 'default' },
            { name: 'mode', value: 'ghost', state: 'default' }
        ]);
    });

    it('should extract multiple key-value pairs from variant object with state', () => {
        const input = `:hover:variant="{ theme: 'dark', size: 'lg', color: 'blue' }"`;
        const result = extractVariantPropertyUtilityClasses(input);
        expect(result).toEqual([
            { name: 'theme', value: 'dark', state: 'hover' },
            { name: 'size', value: 'lg', state: 'hover' },
            { name: 'color', value: 'blue', state: 'hover' }
        ]);
    });

    it('should ignore malformed variant definitions', () => {
        const input = `
      :variant="{ valid: 'yes' }"
      :variant="{ broken: value }"
    `;
        const result = extractVariantPropertyUtilityClasses(input);
        expect(result).toEqual([{ name: 'valid', value: 'yes', state: 'default' }]);
    });

    it('should handle keys and values with quotes and dashes', () => {
        const input = `
      :variant="{ 'layout-style': 'full-width', "text": "title" }"
    `;
        const result = extractVariantPropertyUtilityClasses(input);
        expect(result).toEqual([
            { name: 'layout-style', value: 'full-width', state: 'default' },
            { name: 'text', value: 'title', state: 'default' }
        ]);
    });

    it('should return an empty array when no matches are found', () => {
        const input = `<div class="no-variant-here"></div>`;
        const result = extractVariantPropertyUtilityClasses(input);
        expect(result).toEqual([]);
    });
});

describe('extractCompiledVariantPropertyUtilityClasses', () => {
    it('should extract a single key-value pair', () => {
        const input = `variant: { theme: 'dark' }`;
        const result = extractCompiledVariantPropertyUtilityClasses(input);
        expect(result).toEqual([{ name: 'theme', value: 'dark', state: 'default' }]);
    });

    it('should extract multiple key-value pairs from one object', () => {
        const input = `variant: { theme: 'dark', size: 'lg', color: 'blue' }`;
        const result = extractCompiledVariantPropertyUtilityClasses(input);
        expect(result).toEqual([
            { name: 'theme', value: 'dark', state: 'default' },
            { name: 'size', value: 'lg', state: 'default' },
            { name: 'color', value: 'blue', state: 'default' }
        ]);
    });

    it('should extract key-value pairs from multiple variant objects', () => {
        const input = `
      variant: { variant: 'outlined' }
      variant: { size: 'small', mode: 'ghost' }
    `;
        const result = extractCompiledVariantPropertyUtilityClasses(input);
        expect(result).toEqual([
            { name: 'variant', value: 'outlined', state: 'default' },
            { name: 'size', value: 'small', state: 'default' },
            { name: 'mode', value: 'ghost', state: 'default' }
        ]);
    });

    it('should extract multiple key-value pairs from variant object with state', () => {
        const input = `':hover:variant': { theme: 'dark', size: 'lg', color: 'blue' }`;
        const result = extractCompiledVariantPropertyUtilityClasses(input);
        expect(result).toEqual([
            { name: 'theme', value: 'dark', state: 'hover' },
            { name: 'size', value: 'lg', state: 'hover' },
            { name: 'color', value: 'blue', state: 'hover' }
        ]);
    });

    it('should ignore malformed variant definitions', () => {
        const input = `
      variant: { valid: 'yes' }
      variant: { broken: value }
    `;
        const result = extractCompiledVariantPropertyUtilityClasses(input);
        expect(result).toEqual([{ name: 'valid', value: 'yes', state: 'default' }]);
    });

    it('should handle keys and values with quotes and dashes', () => {
        const input = `
      variant: { 'layout-style': 'full-width', "text": "title" }
    `;
        const result = extractCompiledVariantPropertyUtilityClasses(input);
        expect(result).toEqual([
            { name: 'layout-style', value: 'full-width', state: 'default' },
            { name: 'text', value: 'title', state: 'default' }
        ]);
    });

    it('should return an empty array when no matches are found', () => {
        const input = `<div class="no-variant-here"></div>`;
        const result = extractCompiledVariantPropertyUtilityClasses(input);
        expect(result).toEqual([]);
    });
});

describe('extractHelperFunctionUtilityClasses', () => {
    it('should extract a single key-value pair', () => {
        const input = `defineVariant({ theme: 'dark' })`;
        const result = extractHelperFunctionUtilityClasses(input);
        expect(result).toEqual([{ name: 'theme', value: 'dark', state: 'default' }]);
    });

    it('should extract multiple key-value pairs from one object', () => {
        const input = `defineVariant({ theme: 'dark', size: 'lg', color: 'blue' })`;
        const result = extractHelperFunctionUtilityClasses(input);
        expect(result).toEqual([
            { name: 'theme', value: 'dark', state: 'default' },
            { name: 'size', value: 'lg', state: 'default' },
            { name: 'color', value: 'blue', state: 'default' }
        ]);
    });

    it('should extract key-value pairs from multiple variant objects', () => {
        const input = `defineVariant({ variant: 'outlined' })
      defineVariant({ size: 'small', mode: 'ghost' })
    `;
        const result = extractHelperFunctionUtilityClasses(input);
        expect(result).toEqual([
            { name: 'variant', value: 'outlined', state: 'default' },
            { name: 'size', value: 'small', state: 'default' },
            { name: 'mode', value: 'ghost', state: 'default' }
        ]);
    });

    it('should extract multiple key-value pairs from variant object with state', () => {
        const input = `defineVariant.hover({ theme: 'dark', size: 'lg', color: 'blue' })`;
        const result = extractHelperFunctionUtilityClasses(input);
        expect(result).toEqual([
            { name: 'theme', value: 'dark', state: 'hover' },
            { name: 'size', value: 'lg', state: 'hover' },
            { name: 'color', value: 'blue', state: 'hover' }
        ]);
    });

    it('should ignore malformed variant definitions', () => {
        const input = `
      defineVariant({ valid: 'yes' })
      defineVariant({ broken: value })
    `;
        const result = extractHelperFunctionUtilityClasses(input);
        expect(result).toEqual([{ name: 'valid', value: 'yes', state: 'default' }]);
    });

    it('should handle keys and values with quotes and dashes', () => {
        const input = `
      defineVariant({ 'layout-style': 'full-width', "text": "title" })
    `;
        const result = extractHelperFunctionUtilityClasses(input);
        expect(result).toEqual([
            { name: 'layout-style', value: 'full-width', state: 'default' },
            { name: 'text', value: 'title', state: 'default' }
        ]);
    });

    it('should return an empty array when no matches are found', () => {
        const input = `<div class="no-variant-here"></div>`;
        const result = extractHelperFunctionUtilityClasses(input);
        expect(result).toEqual([]);
    });
});
