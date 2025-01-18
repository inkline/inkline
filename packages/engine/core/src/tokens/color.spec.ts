import { color, hsla, nscolor } from './color';
import { variable } from './variable';
import { createContext } from '../context';

const options = { context: createContext() };

describe('color', () => {
    it('should create color variables from hex color string', () => {
        const result = color('primary', '#ff0000', options);
        expect(result).toEqual(variable('primary', hsla([0, '100%', '50%', 1]), options));
    });

    it('should create color variables from rgb color string', () => {
        const result = color('primary', 'rgb(255, 0, 0)', options);
        expect(result).toEqual(variable('primary', hsla([0, '100%', '50%', 1]), options));
    });

    it('should create color variables from hsl color string', () => {
        const result = color('primary', 'hsl(0, 100%, 50%)', options);
        expect(result).toEqual(variable('primary', hsla([0, '100%', '50%', 1]), options));
    });

    it('should create color variables from HSLA color object', () => {
        const result = color('primary', { h: 0, s: '100%', l: '50%', a: 0.5 }, options);
        expect(result).toEqual(variable('primary', hsla([0, '100%', '50%', 0.5]), options));
    });

    it('should create color variables from HSLA color array', () => {
        const result = color('primary', [0, '100%', '50%', 0.5], options);
        expect(result).toEqual(variable('primary', hsla([0, '100%', '50%', 0.5]), options));
    });

    it('should return token with non-namespaced properties', () => {
        const primary = color('primary', '#ff0000', options);

        expect(primary).toBeDefined();
    });
});

describe('nscolor', () => {
    it('should return object with namespaced properties', () => {
        const namespacePrimary = nscolor('namespace', 'primary', '#ff0000', options);

        expect(namespacePrimary).toBeDefined();
    });
});
