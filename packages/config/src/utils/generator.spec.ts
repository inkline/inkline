import {
    createGenerateFn,
    createGenericDesignTokenVariantGenerateFn,
    defineGenerator,
    defineGeneratorValueFn,
    getSortedVariantsFieldKeys
} from './generator';
import {
    ClassifierType,
    GeneratorType,
    ResolvedTheme,
    ResolvedThemeColor,
    ResolvedThemeTransition
} from '../types';
import { createTestingGeneratorMeta } from '../__tests__/utils';

describe('defineGenerator', () => {
    it('should return the same generator definition that was passed', () => {
        const generatorFn = vi.fn();
        const generator = { key: [], type: GeneratorType.Default, generate: generatorFn };
        const result = defineGenerator(generator);
        expect(result).toBe(generator);
    });
});

describe('defineGeneratorValueFn', () => {
    it('should return the same generator function that was passed', () => {
        const generatorFn = vi.fn();
        const result = defineGeneratorValueFn(generatorFn);
        expect(result).toBe(generatorFn);
    });
});

describe('getSortedVariantsFieldKeys', () => {
    it('should prioritize the "default" key to the top if its value does not contain "var"', () => {
        const variants = { default: 'solid', bold: 'var(--bold)', light: 'var(--light)' };
        const sortedKeys = getSortedVariantsFieldKeys(variants);
        expect(sortedKeys[0]).toBe('default');
        expect(sortedKeys).toEqual(['default', 'bold', 'light']);
    });

    it('should return keys in their original order when the "default" value contains "var"', () => {
        const variants = { default: 'var(--default)', bold: 'bold', light: 'light' };
        const sortedKeys = getSortedVariantsFieldKeys(variants);
        expect(sortedKeys).toEqual(['default', 'bold', 'light']);
    });

    it('should return keys in their original order when "default" is not present', () => {
        const variants = { bold: 'bold', light: 'light', extra: 'extra' };
        const sortedKeys = getSortedVariantsFieldKeys(variants);
        expect(sortedKeys).toEqual(['bold', 'light', 'extra']);
    });

    it('should handle an empty object without errors', () => {
        const variants = {};
        const sortedKeys = getSortedVariantsFieldKeys(variants);
        expect(sortedKeys).toEqual([]);
    });
});

describe('createGenerateFn', () => {
    it('should return a function that calls generateValue with provided value and meta', () => {
        const mockGenerateValue = vi.fn().mockReturnValue(['generated']);
        const generator = createGenerateFn(mockGenerateValue);
        const value = 'test value';
        const meta = createTestingGeneratorMeta();

        const result = generator(value, meta);

        expect(mockGenerateValue).toHaveBeenCalledWith(value, meta);
        expect(result).toEqual(['generated']);
    });
});

describe('createGenericDesignTokenVariantGenerateFn', () => {
    it('should generate correct CSS variables for primitive value', () => {
        const theme = {
            transition: {
                $type: ClassifierType.PrimitiveVariants,
                default: {
                    property: 'all',
                    duration: 100,
                    timingFunction: 'ease'
                }
            }
        } as unknown as ResolvedTheme;
        const meta = createTestingGeneratorMeta({
            path: ['transition', 'default'],
            theme
        });

        const generateFn = createGenericDesignTokenVariantGenerateFn<ResolvedThemeTransition>();
        expect(generateFn(theme.transition.default, meta)).toEqual([
            '--transition-property: all;',
            '--transition-duration: 100;',
            '--transition-timing-function: ease;'
        ]);
    });

    it('should generate correct CSS variables and aggregate primitive value', () => {
        const theme = {
            transition: {
                $type: ClassifierType.PrimitiveVariants,
                default: {
                    property: 'all',
                    duration: 100,
                    timingFunction: 'ease'
                }
            }
        } as unknown as ResolvedTheme;
        const meta = createTestingGeneratorMeta({
            path: ['transition', 'default'],
            theme
        });

        const generateFn = createGenericDesignTokenVariantGenerateFn<ResolvedThemeTransition>({
            aggregate: ['property', 'duration', 'timingFunction']
        });
        expect(generateFn(theme.transition.default, meta)).toEqual([
            '--transition-property: all;',
            '--transition-duration: 100;',
            '--transition-timing-function: ease;',
            '--transition: var(--transition-property) var(--transition-duration) var(--transition-timing-function);'
        ]);
    });

    it('should generate correct CSS variables for value in "default" entity variant', () => {
        const theme = {
            components: {
                $type: ClassifierType.Group,
                button: {
                    $type: ClassifierType.EntityVariants,
                    default: {
                        $type: ClassifierType.Group,
                        transition: {
                            property: 'all',
                            duration: 100,
                            timingFunction: 'ease'
                        }
                    }
                }
            }
        } as unknown as ResolvedTheme;
        const meta = createTestingGeneratorMeta({
            path: ['components', 'button', 'default', 'transition'],
            theme
        });

        const generateFn = createGenericDesignTokenVariantGenerateFn<ResolvedThemeTransition>();
        expect(generateFn(theme.components.button.default.transition, meta)).toEqual([
            '--button--transition-property: all;',
            '--button--transition-duration: 100;',
            '--button--transition-timing-function: ease;'
        ]);
    });

    it('should generate correct CSS variables for nested value in "default" entity variant', () => {
        const theme = {
            components: {
                $type: ClassifierType.Group,
                button: {
                    $type: ClassifierType.EntityVariants,
                    default: {
                        $type: ClassifierType.Group,
                        icon: {
                            $type: ClassifierType.Group,
                            transition: {
                                property: 'all',
                                duration: 100,
                                timingFunction: 'ease'
                            }
                        }
                    }
                }
            }
        } as unknown as ResolvedTheme;
        const meta = createTestingGeneratorMeta({
            path: ['components', 'button', 'default', 'icon', 'transition'],
            theme
        });

        const generateFn = createGenericDesignTokenVariantGenerateFn<ResolvedThemeTransition>();
        expect(generateFn(theme.components.button.default.icon.transition, meta)).toEqual([
            '--button--icon--transition-property: all;',
            '--button--icon--transition-duration: 100;',
            '--button--icon--transition-timing-function: ease;'
        ]);
    });

    it('should generate correct CSS variables for value in non-default entity variant', () => {
        const theme = {
            components: {
                $type: ClassifierType.Group,
                button: {
                    $type: ClassifierType.EntityVariants,
                    primary: {
                        $type: ClassifierType.Group,
                        background: {
                            h: 240,
                            s: 100,
                            l: 50,
                            a: 1
                        }
                    }
                }
            }
        } as unknown as ResolvedTheme;
        const meta = createTestingGeneratorMeta({
            path: ['components', 'button', 'primary', 'background'],
            theme
        });

        const generateFn = createGenericDesignTokenVariantGenerateFn<ResolvedThemeColor>();
        expect(generateFn(theme.components.button.primary.background, meta)).toEqual([
            '--button--primary--background-h: 240;',
            '--button--primary--background-s: 100;',
            '--button--primary--background-l: 50;',
            '--button--primary--background-a: 1;'
        ]);
    });

    it('should generate correct CSS variables for nested value in non-default entity variant', () => {
        const theme = {
            components: {
                $type: ClassifierType.Group,
                button: {
                    $type: ClassifierType.EntityVariants,
                    primary: {
                        $type: ClassifierType.Group,
                        icon: {
                            $type: ClassifierType.Group,
                            background: {
                                h: 240,
                                s: 100,
                                l: 50,
                                a: 1
                            }
                        }
                    }
                }
            }
        } as unknown as ResolvedTheme;
        const meta = createTestingGeneratorMeta({
            path: ['components', 'button', 'primary', 'icon', 'background'],
            theme
        });

        const generateFn = createGenericDesignTokenVariantGenerateFn<ResolvedThemeColor>();
        expect(generateFn(theme.components.button.primary.icon.background, meta)).toEqual([
            '--button--primary--icon--background-h: 240;',
            '--button--primary--icon--background-s: 100;',
            '--button--primary--icon--background-l: 50;',
            '--button--primary--icon--background-a: 1;'
        ]);
    });
});
