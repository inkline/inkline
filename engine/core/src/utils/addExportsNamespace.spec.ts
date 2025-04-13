import { addExportsNamespace } from './addExportsNamespace';

describe('addExportsNamespace', () => {
    it('should add namespace to keys correctly', () => {
        const values = { key1: 'value1', key2: 'value2' };

        const result = addExportsNamespace(values, 'namespace');

        expect(result).toEqual({
            namespaceKey1: 'value1',
            namespaceKey2: 'value2'
        });
    });

    it('should handle empty values object correctly', () => {
        const values = {};

        const result = addExportsNamespace(values, 'namespace');

        expect(result).toEqual({});
    });

    it('should handle nested namespaces correctly', () => {
        const values = { key1: 'value1' };

        const result = addExportsNamespace(values, 'namespace--subnamespace');

        expect(result).toEqual({
            namespaceSubnamespaceKey1: 'value1'
        });
    });

    it('should handle values with different types correctly', () => {
        const values = { key1: 123, key2: true, key3: 'test' };

        const result = addExportsNamespace(values, 'namespace');

        expect(result).toEqual({
            namespaceKey1: 123,
            namespaceKey2: true,
            namespaceKey3: 'test'
        });
    });

    it('should handle values with special characters in keys correctly', () => {
        const values = { 'key-1': 'value1', key_2: 'value2' };

        const result = addExportsNamespace(values, 'namespace');

        expect(result).toEqual({
            namespaceKey1: 'value1',
            namespaceKey_2: 'value2'
        });
    });

    it('should return object with namespaced properties', () => {
        const values = { key1: 123, key2: true, key3: 'test' };
        const result = addExportsNamespace(values, 'namespace');

        const { namespaceKey1, namespaceKey2, namespaceKey3 } = result;

        expect(namespaceKey1).toBeDefined();
        expect(namespaceKey2).toBeDefined();
        expect(namespaceKey3).toBeDefined();
    });
});
