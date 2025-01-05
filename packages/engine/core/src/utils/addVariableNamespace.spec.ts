import { ref, variable } from '../tokens';
import { addVariableNamespace } from './addVariableNamespace';
import { createContext } from '../context';

const options = { context: createContext() };

describe('namespace', () => {
    it('should create a namespaced variable for a primitive value', () => {
        const namespaceString = 'ns';
        const variableName = 'originalName';
        const variableInstance = variable('originalName', 'originalValue', options);
        const namespacedVariableInstance = addVariableNamespace(
            namespaceString,
            variableInstance,
            options
        );

        expect(namespacedVariableInstance.__name).toBe(`${namespaceString}--${variableName}`);
        expect(namespacedVariableInstance.__value).toEqual(ref(variableInstance));
    });

    it('should create a namespaced variable for a ref value', () => {
        const namespaceString = 'ns';
        const referenceInstance = ref('refName');
        const variableName = 'originalName';
        const variableInstance = variable('originalName', referenceInstance, options);
        const namespacedVariableInstance = addVariableNamespace(
            namespaceString,
            variableInstance,
            options
        );

        expect(namespacedVariableInstance.__name).toBe(`${namespaceString}--${variableName}`);
        expect(namespacedVariableInstance.__value).toEqual(ref(variableInstance));
    });

    it('should create a namespaced variable for a composed value', () => {
        const namespaceString = 'ns';
        const referenceInstance1 = ref('refName1');
        const referenceInstance2 = ref('refName2');
        const variableName = 'originalName';
        const variableInstance = variable(
            variableName,
            [referenceInstance1, referenceInstance2],
            options
        );
        const namespacedVariableInstance = addVariableNamespace(
            namespaceString,
            variableInstance,
            options
        );

        expect(namespacedVariableInstance.__name).toBe(`${namespaceString}--${variableName}`);
        expect(namespacedVariableInstance.__value).toEqual([
            ref(`${namespaceString}--${referenceInstance1.__name}`),
            ref(`${namespaceString}--${referenceInstance2.__name}`)
        ]);
    });

    it('should create a namespaced variable for a composed value with fallback', () => {
        const namespaceString = 'ns';
        const referenceInstance1 = ref('refName1', 'fallback1');
        const referenceInstance2 = ref('refName2', 'fallback2');
        const variableName = 'originalName';
        const variableInstance = variable(
            variableName,
            [referenceInstance1, referenceInstance2],
            options
        );
        const namespacedVariableInstance = addVariableNamespace(
            namespaceString,
            variableInstance,
            options
        );

        expect(namespacedVariableInstance.__name).toBe(`${namespaceString}--${variableName}`);
        expect(namespacedVariableInstance.__value).toEqual([
            ref(`${namespaceString}--${referenceInstance1.__name}`, referenceInstance1.__fallback),
            ref(`${namespaceString}--${referenceInstance2.__name}`, referenceInstance2.__fallback)
        ]);
    });

    it('should not modify non-ref values in a composed variable', () => {
        const namespaceString = 'ns';
        const referenceInstance = ref('refName');
        const variableName = 'originalName';
        const variableInstance = variable(
            variableName,
            [referenceInstance, 'simpleValue'],
            options
        );
        const namespacedVariableInstance = addVariableNamespace(
            namespaceString,
            variableInstance,
            options
        );

        expect(namespacedVariableInstance.__name).toBe(`${namespaceString}--${variableName}`);
        expect(namespacedVariableInstance.__value).toEqual([
            ref(`${namespaceString}--${referenceInstance.__name}`),
            'simpleValue'
        ]);
    });
});
