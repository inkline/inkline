import { toUnderscoreCase } from '@inkline/inkline/src/helpers/toUnderscoreCase';

describe('Helpers', () => {
    describe('toUnderscoreCase()', () => {
        it('should convert string from camel case to underscore case', () => {
            expect(toUnderscoreCase('exampleCamelCase')).toEqual('example_camel_case');
        });

        it('should convert string from dash case to underscore case', () => {
            expect(toUnderscoreCase('example-dash-case', 'dash')).toEqual('example_dash_case');
        });
    });
});
