import { color, hsla, nscolor } from './color';
import { variable } from './variable';
import { ref } from './ref';
import { createContext } from '../context';

const options = { context: createContext() };

describe('color', () => {
    it('should create color variables from hex color string', () => {
        const result = color('primary', '#ff0000', options);
        expect(result).toEqual({
            primaryH: variable('primary-h', 0, options),
            primaryS: variable('primary-s', '100%', options),
            primaryL: variable('primary-l', '50%', options),
            primaryA: variable('primary-a', 1, options),
            primary: variable(
                'primary',
                hsla([
                    ref(variable('primary-h', 0, options)),
                    ref(variable('primary-s', '100%', options)),
                    ref(variable('primary-l', '50%', options)),
                    ref(variable('primary-a', 1, options))
                ]),
                options
            )
        });
    });

    it('should create color variables from rgb color string', () => {
        const result = color('primary', 'rgb(255, 0, 0)', options);
        expect(result).toEqual({
            primaryH: variable('primary-h', 0, options),
            primaryS: variable('primary-s', '100%', options),
            primaryL: variable('primary-l', '50%', options),
            primaryA: variable('primary-a', 1, options),
            primary: variable(
                'primary',
                hsla([
                    ref(variable('primary-h', 0, options)),
                    ref(variable('primary-s', '100%', options)),
                    ref(variable('primary-l', '50%', options)),
                    ref(variable('primary-a', 1, options))
                ]),
                options
            )
        });
    });

    it('should create color variables from hsl color string', () => {
        const result = color('primary', 'hsl(0, 100%, 50%)', options);
        expect(result).toEqual({
            primaryH: variable('primary-h', 0, options),
            primaryS: variable('primary-s', '100%', options),
            primaryL: variable('primary-l', '50%', options),
            primaryA: variable('primary-a', 1, options),
            primary: variable(
                'primary',
                hsla([
                    ref(variable('primary-h', 0, options)),
                    ref(variable('primary-s', '100%', options)),
                    ref(variable('primary-l', '50%', options)),
                    ref(variable('primary-a', 1, options))
                ]),
                options
            )
        });
    });

    it('should create color variables from HSLA color object', () => {
        const result = color('primary', { h: 0, s: '100%', l: '50%', a: 0.5 }, options);
        expect(result).toEqual({
            primaryH: variable('primary-h', 0, options),
            primaryS: variable('primary-s', '100%', options),
            primaryL: variable('primary-l', '50%', options),
            primaryA: variable('primary-a', 0.5, options),
            primary: variable(
                'primary',
                hsla([
                    ref(variable('primary-h', 0, options)),
                    ref(variable('primary-s', '100%', options)),
                    ref(variable('primary-l', '50%', options)),
                    ref(variable('primary-a', 0.5, options))
                ]),
                options
            )
        });
    });

    it('should create color variables from HSLA color array', () => {
        const result = color('primary', [0, '100%', '50%', 0.5], options);
        expect(result).toEqual({
            primaryH: variable('primary-h', 0, options),
            primaryS: variable('primary-s', '100%', options),
            primaryL: variable('primary-l', '50%', options),
            primaryA: variable('primary-a', 0.5, options),
            primary: variable(
                'primary',
                hsla([
                    ref(variable('primary-h', 0, options)),
                    ref(variable('primary-s', '100%', options)),
                    ref(variable('primary-l', '50%', options)),
                    ref(variable('primary-a', 0.5, options))
                ]),
                options
            )
        });
    });

    it('should return object with non-namespaced properties', () => {
        const result = color('primary', '#ff0000', options);

        const { primaryH, primaryS, primaryL, primaryA, primary } = result;

        expect(primaryH).toBeDefined();
        expect(primaryS).toBeDefined();
        expect(primaryL).toBeDefined();
        expect(primaryA).toBeDefined();
        expect(primary).toBeDefined();
    });
});

describe('nscolor', () => {
    it('should return object with namespaced properties', () => {
        const result = nscolor('namespace', 'primary', '#ff0000', options);

        const {
            namespacePrimaryH,
            namespacePrimaryS,
            namespacePrimaryL,
            namespacePrimaryA,
            namespacePrimary
        } = result;

        expect(namespacePrimaryH).toBeDefined();
        expect(namespacePrimaryS).toBeDefined();
        expect(namespacePrimaryL).toBeDefined();
        expect(namespacePrimaryA).toBeDefined();
        expect(namespacePrimary).toBeDefined();
    });
});
