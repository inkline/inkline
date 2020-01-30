import { toCamelCase } from '@inkline/inkline/src/helpers/toCamelCase';

describe('Helpers', () => {
    describe('toCamelCase()', () => {
        it('should convert string from dash case to camel case', () => {
            expect(toCamelCase('example-dash-case')).toEqual('exampleDashCase');
        });

        it('should convert string from underscore case to camel case', () => {
            expect(toCamelCase('example_underscore_case', 'underscore')).toEqual('exampleUnderscoreCase');
        });
    });
});
