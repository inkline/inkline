import { theme } from './theme';
import { TokenType } from '../types';
import { createContext } from '../context';

const options = { context: createContext() };

describe('theme', () => {
    it('should create a theme with the specified name', () => {
        const themeName = 'dark';
        const themeInstance = theme(themeName, options);
        expect(themeInstance.__type).toBe(TokenType.Theme);
        expect(themeInstance.__name).toBe(themeName);
    });

    it('should initialize empty variables and selectors sets', () => {
        const themeName = 'light';
        const themeInstance = theme(themeName, options);
        expect(themeInstance.__keys.variables.size).toBe(0);
        expect(themeInstance.__keys.selectors.size).toBe(0);
    });

    it('should initialize empty variables and selectors objects', () => {
        const themeName = 'minimal';
        const themeInstance = theme(themeName, options);
        expect(Object.keys(themeInstance.variables)).toHaveLength(0);
        expect(Object.keys(themeInstance.selectors)).toHaveLength(0);
    });
});
