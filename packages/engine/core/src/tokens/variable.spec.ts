import { variable } from './variable';
import { TokenType } from '../types';
import { createContext } from '../context';

const options = { context: createContext() };

describe('variable', () => {
    it('should create a variable with name and value', () => {
        const variableName = 'color';
        const variableValue = 'red';
        const variableInstance = variable(variableName, variableValue, options);

        expect(variableInstance).toEqual({
            __type: TokenType.Variable,
            __name: variableName,
            __value: variableValue
        });
    });

    it('should automatically get added to a theme', () => {
        const { context } = options;
        const themeName = 'test';
        const variableName = 'size';
        const variableValue = 10;
        const variableInstance = variable(variableName, variableValue, {
            theme: themeName,
            ...options
        });

        expect(context.themes[themeName].variables[variableName]).toEqual(variableInstance);
    });
});
