import { createGenericVariantGenerateFn, getSortedVariantsFieldKeys } from './generator';
import { GeneratorOutput } from '../types';
import { createTestingGeneratorMeta } from '../__tests__/utils';
import { ResolvedThemeColor, ResolvedThemeTransition } from '../modules';
import {
    defineComponent,
    defineComponentsGroup,
    defineGenerator,
    defineGeneratorValueFn,
    defineTheme,
    defineTransitionVariable
} from './define';

describe('defineGenerator', () => {
    it('should return the same generator definition that was passed', () => {
        const generatorFn = vi.fn();
        const generator = { key: [], output: GeneratorOutput.Default, generate: generatorFn };
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

describe('createGenericDesignTokenVariantGenerateFn', () => {
    it('should generate correct CSS variables for primitive value', () => {
        const theme = defineTheme({
            transition: defineTransitionVariable({
                property: 'all',
                duration: 100,
                timingFunction: 'ease'
            })
        });
        const meta = createTestingGeneratorMeta({
            path: ['transition', 'default'],
            theme
        });

        const generateFn = createGenericVariantGenerateFn<ResolvedThemeTransition>();
        expect(generateFn(theme.transition?.default as ResolvedThemeTransition, meta)).toEqual([
            '--transition-property: all;',
            '--transition-duration: 100;',
            '--transition-timing-function: ease;'
        ]);
    });

    it('should generate correct CSS variables and aggregate primitive value', () => {
        const theme = defineTheme({
            transition: defineTransitionVariable({
                property: 'all',
                duration: 100,
                timingFunction: 'ease'
            })
        });
        const meta = createTestingGeneratorMeta({
            path: ['transition', 'default'],
            theme
        });

        const generateFn = createGenericVariantGenerateFn<ResolvedThemeTransition>({
            aggregate: ['property', 'duration', 'timingFunction']
        });
        expect(generateFn(theme.transition?.default as ResolvedThemeTransition, meta)).toEqual([
            '--transition-property: all;',
            '--transition-duration: 100;',
            '--transition-timing-function: ease;',
            '--transition: var(--transition-property) var(--transition-duration) var(--transition-timing-function);'
        ]);
    });

    it('should generate correct CSS variables for value in "default" entity variant', () => {
        const theme = defineTheme({
            components: defineComponentsGroup({
                button: defineComponent({
                    transition: {
                        property: 'all',
                        duration: 100,
                        timingFunction: 'ease'
                    }
                })
            })
        });
        const meta = createTestingGeneratorMeta({
            path: ['components', 'button', 'default', 'transition'],
            theme: theme
        });

        const generateFn = createGenericVariantGenerateFn<ResolvedThemeTransition>();
        expect(
            generateFn(
                theme.components?.button?.default?.transition as ResolvedThemeTransition,
                meta
            )
        ).toEqual([
            '--button--transition-property: all;',
            '--button--transition-duration: 100;',
            '--button--transition-timing-function: ease;'
        ]);
    });

    it('should generate correct CSS variables for nested value in "default" entity variant', () => {
        const theme = defineTheme({
            components: defineComponentsGroup({
                button: defineComponent({
                    icon: {
                        transition: {
                            property: 'all',
                            duration: 100,
                            timingFunction: 'ease'
                        }
                    }
                })
            })
        });
        const meta = createTestingGeneratorMeta({
            path: ['components', 'button', 'default', 'icon', 'transition'],
            theme
        });

        const generateFn = createGenericVariantGenerateFn<ResolvedThemeTransition>();
        expect(
            generateFn(
                (theme.components?.button?.default?.icon as Record<string, ResolvedThemeTransition>)
                    .transition,
                meta
            )
        ).toEqual([
            '--button--icon--transition-property: all;',
            '--button--icon--transition-duration: 100;',
            '--button--icon--transition-timing-function: ease;'
        ]);
    });

    it('should generate correct CSS variables for value in non-default entity variant', () => {
        const theme = defineTheme({
            components: defineComponentsGroup({
                button: defineComponent(
                    {},
                    {
                        primary: {
                            background: {
                                h: 240,
                                s: 100,
                                l: 50,
                                a: 1
                            }
                        }
                    }
                )
            })
        });
        const meta = createTestingGeneratorMeta({
            path: ['components', 'button', 'primary', 'background'],
            theme
        });

        const generateFn = createGenericVariantGenerateFn<ResolvedThemeColor>();
        expect(
            generateFn(theme.components?.button?.primary?.background as ResolvedThemeColor, meta)
        ).toEqual([
            '--button--primary--background-h: 240;',
            '--button--primary--background-s: 100;',
            '--button--primary--background-l: 50;',
            '--button--primary--background-a: 1;'
        ]);
    });

    it('should generate correct CSS variables for nested value in non-default entity variant', () => {
        const theme = defineTheme({
            components: defineComponentsGroup({
                button: defineComponent(
                    {},
                    {
                        primary: {
                            icon: {
                                background: {
                                    h: 240,
                                    s: 100,
                                    l: 50,
                                    a: 1
                                }
                            }
                        }
                    }
                )
            })
        });
        const meta = createTestingGeneratorMeta({
            path: ['components', 'button', 'primary', 'icon', 'background'],
            theme
        });

        const generateFn = createGenericVariantGenerateFn<ResolvedThemeColor>();
        expect(
            generateFn(
                (theme.components?.button?.primary?.icon as Record<string, ResolvedThemeColor>)
                    .background,
                meta
            )
        ).toEqual([
            '--button--primary--icon--background-h: 240;',
            '--button--primary--icon--background-s: 100;',
            '--button--primary--icon--background-l: 50;',
            '--button--primary--icon--background-a: 1;'
        ]);
    });
});
