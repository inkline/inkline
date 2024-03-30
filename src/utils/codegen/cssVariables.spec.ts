import { codegenCssVariables } from './cssVariables';

describe('cssVariables', () => {
    describe('set', () => {
        it('should generate a correct CSS variable declaration', () => {
            const name = 'color-primary';
            const value = '#007bff';
            const expected = '--color-primary: #007bff;';

            const result = codegenCssVariables.set(name, value);
            expect(result).toBe(expected);
        });
    });

    describe('get', () => {
        it('should generate a correct CSS variable retrieval', () => {
            const name = 'color-primary';
            const expected = 'var(--color-primary)';

            const result = codegenCssVariables.get(name);
            expect(result).toBe(expected);
        });

        it('should include a fallback when provided', () => {
            const name = 'color-primary';
            const fallback = '#007bff';
            const expected = 'var(--color-primary, #007bff)';

            const result = codegenCssVariables.get(name, fallback);
            expect(result).toBe(expected);
        });
    });
});
