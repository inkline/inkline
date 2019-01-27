import { toCamelCase } from '@inkline/inkline/helpers/toCamelCase';

describe('Helpers', () => {
    describe('toCamelCase()', () => {
        it('should convert string from dash case to camel case', () => {
            expect(toCamelCase('example-dash-case', 'dash')).toEqual('exampleDashCase');
        });

        it('should convert string from underscore case to camel case', () => {
            expect(toCamelCase('example_underscore_case', 'underscore')).toEqual('exampleUnderscoreCase');
        });
    });
});
