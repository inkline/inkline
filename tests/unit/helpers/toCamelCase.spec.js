import { toCamelCase } from 'inkline/helpers/toCamelCase';

describe('Helpers', () => {
    describe('toCamelCase', () => {
        it('should convert string from dash case to camel case', () => {
            expect(toCamelCase('example-dash-case', 'dash')).toEqual('exampleDashCase');
        });

        it('should convert string from snake case to camel case', () => {
            expect(toCamelCase('example_snake_case', 'snake')).toEqual('exampleSnakeCase');
        });
    });
});
