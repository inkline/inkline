import { nsvariable, variable } from '../tokens';
import { extractVariableNamespace } from './extractVariableNamespace';

describe('extractVariableNamespace', () => {
    it('should extract namespace from a variable correctly', () => {
        const variableInstance = nsvariable('namespace', 'property', 'value');

        expect(extractVariableNamespace(variableInstance)).toEqual(['namespace']);
    });

    it('should return an empty string if the namespace is empty', () => {
        const variableInstance = variable('property', 'value');

        expect(extractVariableNamespace(variableInstance)).toEqual('');
    });
});
