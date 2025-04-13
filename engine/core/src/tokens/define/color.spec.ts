import { defineColor, defineColorFn, OutputMapColor } from './color';
import { nsvariable } from '../variable';
import { ref } from '../ref';
import { hsla } from '../color';
import { createContext } from '../../context';

const ns = 'namespace';

const options = { context: createContext() };

describe('defineColorFn', () => {
    it('should handle predefined color values correctly', () => {
        const result = defineColorFn('color')(ns, 'inherit', options);
        expect(result).toEqual({
            namespaceColor: nsvariable(ns, 'color', 'inherit', options)
        });
    });

    it('should create variables for HSLA color properties', () => {
        const value = { h: 120, s: '50%', l: '50%', a: 0.5 };
        const result = defineColorFn('color')(ns, value, options);
        expect(result).toEqual({
            namespaceColor: nsvariable(ns, 'color', hsla([120, '50%', '50%', 0.5]), options)
        });
    });

    it('should create variables for string color values', () => {
        const value = 'hsl(120, 50%, 50%)';
        const result = defineColorFn('color')(ns, value, options);
        expect(result).toEqual({
            namespaceColor: nsvariable(ns, 'color', hsla([120, '50%', '50%', 1]), options)
        });
    });

    it('should return object with namespaced properties', () => {
        const result = defineColorFn<typeof ns, OutputMapColor<typeof ns>>('color')(
            ns,
            { h: 120, s: '50%', l: '50%', a: 0.5 },
            options
        );

        const { namespaceColor } = result;

        expect(namespaceColor).toBeDefined();
    });

    it('should return object with non-namespaced properties', () => {
        const result = defineColorFn<'', OutputMapColor<''>>('color')(
            '',
            { h: 120, s: '50%', l: '50%', a: 0.5 },
            options
        );

        const { color } = result;

        expect(color).toBeDefined();
    });
});

describe('defineColor', () => {
    it('should create variables for token values', () => {
        const value = nsvariable(ns, 'variable', 'value', options);
        const result = defineColor(ns, ref(value), options);
        expect(result).toEqual(
            expect.objectContaining({
                namespaceColor: nsvariable(ns, 'color', ref(value), options)
            })
        );
    });
});
