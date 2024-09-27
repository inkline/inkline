import { toCamelCase } from './toCamelCase';

describe('Helpers', () => {
    describe('toCamelCase()', () => {
        it('should convert string from kebab case to camel case', () => {
            expect(toCamelCase('example-kebab-case')).toEqual('exampleKebabCase');
        });

        it('should convert string from snake case to camel case', () => {
            expect(toCamelCase('example_snake_case')).toEqual('exampleSnakeCase');
        });
    });
});
