import { codegenScssVariables } from './scssVariables';

describe('codegenScssVariables', () => {
    describe('set', () => {
        it('should return scss variable with default flag when isDefault is true', () => {
            const result = codegenScssVariables.set('color', 'red', true);
            expect(result).toEqual('$color: red !default;');
        });

        it('should return scss variable without default flag when isDefault is false', () => {
            const result = codegenScssVariables.set('color', 'red', false);
            expect(result).toEqual('$color: red;');
        });
    });

    describe('get', () => {
        it('should return scss variable', () => {
            const result = codegenScssVariables.get('color');
            expect(result).toEqual('$color');
        });
    });

    describe('interpolate', () => {
        it('should return interpolated scss variable', () => {
            const result = codegenScssVariables.interpolate('color');
            expect(result).toEqual('#{$color}');
        });
    });
});
