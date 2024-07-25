import { add, calc, divide, multiply, ref, selector, subtract, theme, variable } from './tokens';
import { TokenType } from './types';
import { themes } from './themes';

describe('tokens', () => {
    describe('variable', () => {
        it('should create a variable with name and value', () => {
            const variableName = 'color';
            const variableValue = 'red';
            const variableInstance = variable(variableName, variableValue);

            expect(variableInstance).toEqual({
                __type: TokenType.Variable,
                __name: variableName,
                __value: variableValue
            });
        });

        it('should automatically get added to a theme', () => {
            const themeName = 'test';
            const variableName = 'size';
            const variableValue = 10;
            const variableInstance = variable(variableName, variableValue, { theme: themeName });

            expect(themes[themeName].variables[variableName]).toEqual(variableInstance);
        });
    });

    describe('ref', () => {
        it('should create a reference to a variable', () => {
            const variableName = 'color';
            const variableValue = 'red';
            const variableInstance = variable(variableName, variableValue);
            const refInstance = ref(variableInstance);

            expect(refInstance).toEqual({
                __type: TokenType.Reference,
                __name: variableName
            });
        });

        it('should create a blind reference to a variable', () => {
            const variableName = 'color';
            const refInstance = ref(variableName);

            expect(refInstance).toEqual({
                __type: TokenType.Reference,
                __name: variableName
            });
        });

        it('should create a reference with a fallback value', () => {
            const refName = 'color';
            const refFallback = 'green';
            const refInstance = ref(refName, refFallback);

            expect(refInstance).toEqual({
                __type: TokenType.Reference,
                __name: refName,
                __fallback: refFallback
            });
        });
    });

    describe('calc', () => {
        const a = variable('a', 10);
        const b = variable('b', 5);

        it('should create a calc token with references and operations', () => {
            const calcInstance = calc(ref(a), '+', ref(b));

            expect(calcInstance.__type).toBe(TokenType.Calc);
            expect(calcInstance.__value).toEqual([ref(a), '+', ref(b)]);
            expect(calcInstance.__value.length).toBe(3);
        });

        describe('multiply', () => {
            it('should correctly multiply variables', () => {
                const result = multiply(ref(a), ref(b));
                expect(result.__value).toEqual([ref(a), '*', ref(b)]);
            });
        });

        describe('divide', () => {
            it('should correctly divide variables', () => {
                const result = divide(ref(a), ref(b));
                expect(result.__value).toEqual([ref(a), '/', ref(b)]);
            });
        });

        describe('add', () => {
            it('should correctly add variables', () => {
                const result = add(ref(a), ref(b));
                expect(result.__value).toEqual([ref(a), '+', ref(b)]);
            });
        });

        describe('subtract', () => {
            it('should correctly subtract variables', () => {
                const result = subtract(ref(a), ref(b));
                expect(result.__value).toEqual([ref(a), '-', ref(b)]);
            });
        });
    });

    describe('selector', () => {
        it('should create a selector with name and value', () => {
            const background = variable('background', 'red');
            const padding = variable('padding', '10px');

            const selectorName = '.button';
            const selectorValue = {
                background: ref(background),
                padding: ref(padding)
            };
            const selectorInstance = selector(selectorName, selectorValue);

            expect(selectorInstance).toEqual({
                __type: TokenType.Selector,
                __name: selectorName,
                __value: selectorValue
            });
        });
    });

    describe('theme', () => {
        it('should create a theme with the specified name', () => {
            const themeName = 'dark';
            const themeInstance = theme(themeName);
            expect(themeInstance.__type).toBe(TokenType.Theme);
            expect(themeInstance.__name).toBe(themeName);
        });

        it('should initialize empty variables and selectors sets', () => {
            const themeName = 'light';
            const themeInstance = theme(themeName);
            expect(themeInstance.__keys.variables.size).toBe(0);
            expect(themeInstance.__keys.selectors.size).toBe(0);
        });

        it('should initialize empty variables and selectors objects', () => {
            const themeName = 'minimal';
            const themeInstance = theme(themeName);
            expect(Object.keys(themeInstance.variables)).toHaveLength(0);
            expect(Object.keys(themeInstance.selectors)).toHaveLength(0);
        });
    });
});
