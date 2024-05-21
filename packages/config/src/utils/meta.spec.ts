import {
    getResolvedPath,
    isDefaultTheme,
    isEntityPath,
    shouldGenerateAggregateValue
} from './meta';
import { createTestingGeneratorMeta } from '../__tests__/utils';
import { ClassifierType, ResolvedTheme } from '../types';

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
            theme: {
                components: {
                    $type: ClassifierType.Group,
                    button: {
                        $type: ClassifierType.EntityVariants,
                        default: {
                            $type: ClassifierType.Group,
                            color: {
                                h: 0,
                                s: 0,
                                l: 0,
                                a: 1
                            }
                        }
                    }
                }
            } as unknown as ResolvedTheme,
            path: ['components', 'button', 'default', 'color']
        });
        const result = getResolvedPath(meta);
        expect(result).toEqual(['button', 'default', 'color']);
    });
});
