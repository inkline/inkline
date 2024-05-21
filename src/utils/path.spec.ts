import { traversePathByClassification } from './path';
import { createTestingGeneratorMeta } from '../__tests__/utils';
import type { ResolvedTheme } from '../types';

describe('traversePathByClassification', () => {
    it('should traverse path and return kebab-case chunks', () => {
        const meta = createTestingGeneratorMeta({
            theme: {
                components: {
                    buttonGroup: {
                        color: 'red'
                    }
                }
            } as unknown as ResolvedTheme,
            path: ['components', 'buttonGroup', 'color']
        });
        const result = traversePathByClassification(meta, () => true);
        expect(result).toEqual(['components', 'button-group', 'color']);
    });

    it('should ignore chunks when function returns false', () => {
        const meta = createTestingGeneratorMeta({
            theme: {
                components: {
                    button: {
                        color: 'red'
                    }
                }
            } as unknown as ResolvedTheme,
            path: ['components', 'button', 'color']
        });
        const result = traversePathByClassification(meta, () => false);
        expect(result).toEqual([]);
    });

    it('should handle empty path', () => {
        const meta = createTestingGeneratorMeta({
            theme: {},
            path: []
        });
        const result = traversePathByClassification(meta, () => true);
        expect(result).toEqual([]);
    });

    it('should handle path with ignored keys', () => {
        const meta = createTestingGeneratorMeta({
            theme: {
                components: {
                    $ignoreKey: true,
                    button: {
                        color: 'red'
                    }
                }
            } as unknown as ResolvedTheme,
            path: ['components', 'button', 'color']
        });
        const result = traversePathByClassification(meta, (path, part, ctx) => !ctx.ignoreKey);
        expect(result).toEqual(['button', 'color']);
    });
});
