import { color, hsla, nscolor } from './color';
import { variable } from './variable';
import { ref } from './ref';

describe('color', () => {
    it('should create color variables from hex color string', () => {
        const result = color('primary', '#ff0000');
        expect(result).toEqual({
            primaryH: variable('primary-h', 0),
            primaryS: variable('primary-s', '100%'),
            primaryL: variable('primary-l', '50%'),
            primaryA: variable('primary-a', 1),
            primary: variable(
                'primary',
                hsla([
                    ref(variable('primary-h', 0)),
                    ref(variable('primary-s', '100%')),
                    ref(variable('primary-l', '50%')),
                    ref(variable('primary-a', 1))
                ])
            )
        });
    });

    it('should create color variables from rgb color string', () => {
        const result = color('primary', 'rgb(255, 0, 0)');
        expect(result).toEqual({
            primaryH: variable('primary-h', 0),
            primaryS: variable('primary-s', '100%'),
            primaryL: variable('primary-l', '50%'),
            primaryA: variable('primary-a', 1),
            primary: variable(
                'primary',
                hsla([
                    ref(variable('primary-h', 0)),
                    ref(variable('primary-s', '100%')),
                    ref(variable('primary-l', '50%')),
                    ref(variable('primary-a', 1))
                ])
            )
        });
    });

    it('should create color variables from hsl color string', () => {
        const result = color('primary', 'hsl(0, 100%, 50%)');
        expect(result).toEqual({
            primaryH: variable('primary-h', 0),
            primaryS: variable('primary-s', '100%'),
            primaryL: variable('primary-l', '50%'),
            primaryA: variable('primary-a', 1),
            primary: variable(
                'primary',
                hsla([
                    ref(variable('primary-h', 0)),
                    ref(variable('primary-s', '100%')),
                    ref(variable('primary-l', '50%')),
                    ref(variable('primary-a', 1))
                ])
            )
        });
    });

    it('should create color variables from HSLA color object', () => {
        const result = color('primary', { h: 0, s: '100%', l: '50%', a: 0.5 });
        expect(result).toEqual({
            primaryH: variable('primary-h', 0),
            primaryS: variable('primary-s', '100%'),
            primaryL: variable('primary-l', '50%'),
            primaryA: variable('primary-a', 0.5),
            primary: variable(
                'primary',
                hsla([
                    ref(variable('primary-h', 0)),
                    ref(variable('primary-s', '100%')),
                    ref(variable('primary-l', '50%')),
                    ref(variable('primary-a', 0.5))
                ])
            )
        });
    });

    it('should create color variables from HSLA color array', () => {
        const result = color('primary', [0, '100%', '50%', 0.5]);
        expect(result).toEqual({
            primaryH: variable('primary-h', 0),
            primaryS: variable('primary-s', '100%'),
            primaryL: variable('primary-l', '50%'),
            primaryA: variable('primary-a', 0.5),
            primary: variable(
                'primary',
                hsla([
                    ref(variable('primary-h', 0)),
                    ref(variable('primary-s', '100%')),
                    ref(variable('primary-l', '50%')),
                    ref(variable('primary-a', 0.5))
                ])
            )
        });
    });

    it('should return object with non-namespaced properties', () => {
        const result = color('primary', '#ff0000');

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
        const result = nscolor('namespace', 'primary', '#ff0000');

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
