import {
    getResolvedPath,
    isDefaultTheme,
    isEntityPath,
    shouldGenerateAggregateValue,
    traversePathByClassification
} from './meta';
import { createTestingGeneratorMeta } from '../__tests__/utils';
import { ClassificationType } from '../types';
import { defineComponent, defineComponentsGroup, defineTheme } from './define';

describe('shouldGenerateAggregateValue', () => {
    it('should return true for default theme and entity path', () => {
        const meta = createTestingGeneratorMeta({
            themeName: 'default',
            path: ['colors', 'color']
        });
        const result = shouldGenerateAggregateValue(meta);
        expect(result).toBeTruthy();
    });

    it('should return false for non-default theme and entity path', () => {
        const meta = createTestingGeneratorMeta({
            themeName: 'dark',
            path: ['components', 'button', 'color']
        });
        const result = shouldGenerateAggregateValue(meta);
        expect(result).toBeFalsy();
    });

    it('should return false for default theme and non-entity path', () => {
        const meta = createTestingGeneratorMeta({
            themeName: 'default',
            path: ['themes', 'default', 'color']
        });
        const result = shouldGenerateAggregateValue(meta);
        expect(result).toBeTruthy();
    });

    it('should return false for non-default theme and non-entity path', () => {
        const meta = createTestingGeneratorMeta({
            themeName: 'dark',
            path: ['themes', 'default', 'color']
        });
        const result = shouldGenerateAggregateValue(meta);
        expect(result).toBeFalsy();
    });
});

describe('isDefaultTheme', () => {
    it('should return true for default theme', () => {
        const result = isDefaultTheme('default');
        expect(result).toBeTruthy();
    });

    it('should return false for non-default theme', () => {
        const result = isDefaultTheme('dark');
        expect(result).toBeFalsy();
    });
});

describe('isEntityPath', () => {
    it('should return true for path containing components', () => {
        const result = isEntityPath(['components', 'button', 'color']);
        expect(result).toBeTruthy();
    });

    it('should return true for path containing elements', () => {
        const result = isEntityPath(['elements', 'body', 'color']);
        expect(result).toBeTruthy();
    });

    it('should return false for path not containing components or elements', () => {
        const result = isEntityPath(['themes', 'default', 'color']);
        expect(result).toBeFalsy();
    });

    it('should return false for empty path', () => {
        const result = isEntityPath([]);
        expect(result).toBeFalsy();
    });
});

describe('getResolvedPath', () => {
    it('should return path without offset for entity variants', () => {
        const meta = createTestingGeneratorMeta({
            theme: defineTheme({
                components: defineComponentsGroup({
                    button: defineComponent({
                        color: {
                            h: 0,
                            s: 0,
                            l: 0,
                            a: 1
                        }
                    })
                })
            }),
            path: ['components', 'button', 'default', 'color']
        });
        const result = getResolvedPath(meta);
        expect(result).toEqual(['button', 'default', 'color']);
    });
});

describe('traversePathByClassification', () => {
    it('should traverse path and return kebab-case chunks', () => {
        const meta = createTestingGeneratorMeta({
            theme: defineTheme({
                components: defineComponentsGroup({
                    buttonGroup: defineComponent({
                        color: 'red'
                    })
                })
            }),
            path: ['components', 'buttonGroup', 'color']
        });
        const result = traversePathByClassification(meta, () => true);
        expect(result).toEqual(['components', 'button-group', 'color']);
    });

    it('should ignore chunks when function returns false', () => {
        const meta = createTestingGeneratorMeta({
            theme: defineTheme({
                components: defineComponentsGroup({
                    button: defineComponent({
                        color: 'red'
                    })
                })
            }),
            path: ['components', 'button', 'color']
        });
        const result = traversePathByClassification(meta, () => false);
        expect(result).toEqual([]);
    });

    it('should handle empty path', () => {
        const meta = createTestingGeneratorMeta({
            theme: defineTheme({}),
            path: []
        });
        const result = traversePathByClassification(meta, () => true);
        expect(result).toEqual([]);
    });

    it('should handle path with ignored keys', () => {
        const meta = createTestingGeneratorMeta({
            theme: defineTheme({
                components: defineComponentsGroup({
                    button: defineComponent({
                        color: 'red'
                    })
                })
            }),
            path: ['components', 'button', 'color']
        });

        const result = traversePathByClassification(
            meta,
            (path, part, ctx) => !ctx.consume && ctx.type !== ClassificationType.Group
        );
        expect(result).toEqual(['button', 'color']);
    });
});
