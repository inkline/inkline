import { variable } from './variable';
import { ref, vref } from './ref';
import { TokenType } from '../types';
import { createContext } from '../context';

const options = { context: createContext() };

describe('ref', () => {
    it('should create a reference to a variable', () => {
        const variableName = 'color';
        const variableValue = 'red';
        const variableInstance = variable(variableName, variableValue, options);
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

describe('vref', () => {
    it('should create a reference to a variable using the variable value', () => {
        const variableName = 'color';
        const variableValue = 'red';
        const variableInstance = variable(variableName, variableValue, options);
        const refInstance = vref(variableInstance);

        expect(refInstance).toEqual({
            __type: TokenType.Reference,
            __name: variableName,
            __fallback: variableValue
        });
    });
});
