import { toUnderscoreCase } from 'inkline/helpers/toUnderscoreCase';

describe('Helpers', () => {
    describe('toUnderscoreCase()', () => {
        it('should convert string from camel case to underscore case', () => {
            expect(toUnderscoreCase('exampleCamelCase', 'camel')).toEqual('example_camel_case');
        });

        it('should convert string from dash case to underscore case', () => {
            expect(toUnderscoreCase('example-dash-case', 'dash')).toEqual('example_dash_case');
        });
    });
});
