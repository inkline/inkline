import { codegenColorVariables } from '../color';

describe('helpers', () => {
    describe('codegen', () => {
        describe('codegenColorVariables', () => {
            it('should return array of color variable setters', () => {
                expect(codegenColorVariables('red-100', { h: 1, s: 2, l: 3, a: 0.5 })).toEqual([
                    '--color-red-100-h: 1;',
                    '--color-red-100-s: 2%;',
                    '--color-red-100-l: 3%;',
                    '--color-red-100-a: 0.5;',
                    '--color-red-100: hsla(var(--color-red-100-h), var(--color-red-100-s), var(--color-red-100-l), var(--color-red-100-a));'
                ]);
            });
        });
    });
});
