import { toSnakeCase } from './toSnakeCase';

describe('Helpers', () => {
    describe('toSnakeCase()', () => {
        it('should convert string from camel case to snake case', () => {
            expect(toSnakeCase('exampleCamelCase')).toEqual('example_camel_case');
        });

        it('should convert string from kebab case to snake case', () => {
            expect(toSnakeCase('example-kebab-case')).toEqual('example_kebab_case');
        });
    });
});
