import { codegenGetCSSVariable, codegenSetCSSVariable } from '../variable';

describe('helpers', () => {
    describe('codegen', () => {
        describe('codegenSetCSSVariable', () => {
            it('should return code to set css variable', () => {
                expect(codegenSetCSSVariable('key', 'value')).toEqual('--key: value;');
            });
        });

        describe('codegenGetCSSVariable', () => {
            it('should return code to set css variable', () => {
                expect(codegenGetCSSVariable('key')).toEqual('var(--key)');
            });
        });
    });
});
