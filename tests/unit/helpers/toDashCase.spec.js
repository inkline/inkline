import { toDashCase } from 'inkline/helpers/toDashCase';

describe('Helpers', () => {
    describe('toDashCase', () => {
        it('should convert string from camel case to dash case', () => {
            expect(toDashCase('exampleCamelCase', 'camel')).toEqual('example-camel-case');
        });

        it('should convert string from snake case to dash case', () => {
            expect(toDashCase('example_snake_case', 'snake')).toEqual('example-snake-case');
        });
    });
});
