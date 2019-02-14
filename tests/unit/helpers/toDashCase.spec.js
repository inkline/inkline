import { toDashCase } from '@inkline/inkline/src/helpers/toDashCase';

describe('Helpers', () => {
    describe('toDashCase()', () => {
        it('should convert string from camel case to dash case', () => {
            expect(toDashCase('exampleCamelCase', 'camel')).toEqual('example-camel-case');
        });

        it('should convert string from underscore case to dash case', () => {
            expect(toDashCase('example_underscore_case', 'underscore')).toEqual('example-underscore-case');
        });
    });
});
