import { toKebabCase } from './toKebabCase';

describe('Helpers', () => {
    describe('toKebabCase()', () => {
        it('should convert string from camel case to kebab case', () => {
            expect(toKebabCase('exampleCamelCase')).toEqual('example-camel-case');
        });
    });
});
