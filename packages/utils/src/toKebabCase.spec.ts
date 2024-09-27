import { toKebabCase } from './toKebabCase';

describe('Helpers', () => {
    describe('toDashCase()', () => {
        it('should convert string from camel case to dash case', () => {
            expect(toKebabCase('exampleCamelCase')).toEqual('example-camel-case');
        });

        it('should convert string from snake case to dash case', () => {
            expect(toKebabCase('example_snake_case')).toEqual('example-snake-case');
        });
    });
});
