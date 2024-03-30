import { codegenNumberVariant } from '../number';
import { Configuration, NumberVariant } from '../../../../types';

describe('helpers', () => {
    describe('codegen', () => {
        describe('codegenNumberVariant', () => {
            it('should return css variable with applied modifiers', () => {
                const config = {} as Configuration;
                const variableName = 'size';
                const variantName = 'lg';
                const variant: NumberVariant = {
                    multiply: 2
                };

                expect(codegenNumberVariant(config, variableName, variantName, variant))
                    .toEqual('--size-lg: calc(var(--size) * 2);');
            });
        });
    });
});
