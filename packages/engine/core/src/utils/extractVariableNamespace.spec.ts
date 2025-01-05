import { nsvariable, variable } from '../tokens';
import { extractVariableNamespace } from './extractVariableNamespace';
import { createContext } from '../context';

const options = { context: createContext() };

describe('extractVariableNamespace', () => {
    it('should extract namespace from a variable correctly', () => {
        const variableInstance = nsvariable('namespace', 'property', 'value', options);

        expect(extractVariableNamespace(variableInstance)).toEqual(['namespace']);
    });

    it('should return an empty string if the namespace is empty', () => {
        const variableInstance = variable('property', 'value', options);

        expect(extractVariableNamespace(variableInstance)).toEqual('');
    });
});
