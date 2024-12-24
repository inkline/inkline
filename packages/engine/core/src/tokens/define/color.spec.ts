import { defineColor, defineColorFn, OutputMapColor } from './color';
import { nsvariable } from '../variable';
import { ref } from '../ref';
import { hsla } from '../color';

const ns = 'namespace';

describe('defineColorFn', () => {
    it('should handle predefined color values correctly', () => {
        const result = defineColorFn('color')(ns, 'inherit', {});
        expect(result).toEqual({
            namespaceColor: nsvariable(ns, 'color', 'inherit', {})
        });
    });

    it('should create variables for HSLA color properties', () => {
        const value = { h: 120, s: '50%', l: '50%', a: 0.5 };
        const result = defineColorFn('color')(ns, value, {});
        expect(result).toEqual({
            namespaceColorH: nsvariable(ns, 'color-h', 120, {}),
            namespaceColorS: nsvariable(ns, 'color-s', '50%', {}),
            namespaceColorL: nsvariable(ns, 'color-l', '50%', {}),
            namespaceColorA: nsvariable(ns, 'color-a', 0.5, {}),
            namespaceColor: nsvariable(
                ns,
                'color',
                hsla([
                    ref(nsvariable(ns, 'color-h', '')),
                    ref(nsvariable(ns, 'color-s', '')),
                    ref(nsvariable(ns, 'color-l', '')),
                    ref(nsvariable(ns, 'color-a', ''))
                ])
            )
        });
    });

    it('should create variables for string color values', () => {
        const value = 'hsl(120, 50%, 50%)';
        const result = defineColorFn('color')(ns, value, {});
        expect(result).toEqual({
            namespaceColorH: nsvariable(ns, 'color-h', 120, {}),
            namespaceColorS: nsvariable(ns, 'color-s', '50%', {}),
            namespaceColorL: nsvariable(ns, 'color-l', '50%', {}),
            namespaceColorA: nsvariable(ns, 'color-a', 1, {}),
            namespaceColor: nsvariable(
                ns,
                'color',
                hsla([
                    ref(nsvariable(ns, 'color-h', '')),
                    ref(nsvariable(ns, 'color-s', '')),
                    ref(nsvariable(ns, 'color-l', '')),
                    ref(nsvariable(ns, 'color-a', ''))
                ])
            )
        });
    });

    it('should return object with namespaced properties', () => {
        const result = defineColorFn<typeof ns, OutputMapColor<typeof ns>>('color')(
            ns,
            { h: 120, s: '50%', l: '50%', a: 0.5 },
            {}
        );

        const {
            namespaceColorH,
            namespaceColorS,
            namespaceColorL,
            namespaceColorA,
            namespaceColor
        } = result;

        expect(namespaceColorH).toBeDefined();
        expect(namespaceColorS).toBeDefined();
        expect(namespaceColorL).toBeDefined();
        expect(namespaceColorA).toBeDefined();
        expect(namespaceColor).toBeDefined();
    });

    it('should return object with non-namespaced properties', () => {
        const result = defineColorFn<'', OutputMapColor<''>>('color')(
            '',
            { h: 120, s: '50%', l: '50%', a: 0.5 },
            {}
        );

        const { colorH, colorS, colorL, colorA, color } = result;

        expect(colorH).toBeDefined();
        expect(colorS).toBeDefined();
        expect(colorL).toBeDefined();
        expect(colorA).toBeDefined();
        expect(color).toBeDefined();
    });
});

describe('defineColor', () => {
    it('should create variables for token values', () => {
        const value = nsvariable(ns, 'variable', 'value');
        const result = defineColor(ns, ref(value), {});
        expect(result).toEqual(
            expect.objectContaining({
                namespaceColor: nsvariable(ns, 'color', ref(value))
            })
        );
    });
});
