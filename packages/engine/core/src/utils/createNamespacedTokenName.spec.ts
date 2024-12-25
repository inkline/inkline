import { createNamespacedTokenName } from './createNamespacedTokenName';

describe('createNamespacedTokenName', () => {
    it('should create namespaced token name with single namespace', () => {
        const result = createNamespacedTokenName('namespace', 'token');
        expect(result).toBe('namespace--token');
    });

    it('should create namespaced token name with multiple namespaces', () => {
        const result = createNamespacedTokenName(['namespace1', 'namespace2'], 'token');
        expect(result).toBe('namespace1--namespace2--token');
    });

    it('should create namespaced token name with empty namespace', () => {
        const result = createNamespacedTokenName('', 'token');
        expect(result).toBe('token');
    });

    it('should create namespaced token name with empty string namespace', () => {
        const result = createNamespacedTokenName('', 'token');
        expect(result).toBe('token');
    });

    it('should create namespaced token name with empty array namespace', () => {
        const result = createNamespacedTokenName([], 'token');
        expect(result).toBe('token');
    });
});
