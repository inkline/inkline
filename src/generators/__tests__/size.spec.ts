import {
    sizeMultiplierGenerator,
    sizePercentagesGenerator,
    sizeMultiplierVariantsGenerator
} from '../size';
import { ResolvedConfiguration, ResolvedTheme } from '../../types';

describe('generators', () => {
    describe('size.multiplier', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'size.multiplier';
                expect(sizeMultiplierGenerator.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.size.multiplier';
                expect(sizeMultiplierGenerator.test.test(path)).toEqual(true);
            });
        });

        describe('generator', () => {
            it('should generate variables for all parts of composed variable', () => {
                const config = {} as ResolvedConfiguration;
                const theme = {
                    size: {
                        multiplier: 1
                    }
                } as unknown as ResolvedTheme;
                const value = theme.size.multiplier;
                const path = ['size.multiplier'];

                expect(sizeMultiplierGenerator.apply({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Size multiplier variable',
                    ' */',
                    `--size-multiplier: ${theme.size.multiplier};`
                ]);
            });
        });
    });

    describe('size.percentages', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'size.percentages';
                expect(sizePercentagesGenerator.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.size.percentages';
                expect(sizePercentagesGenerator.test.test(path)).toEqual(true);
            });
        });

        describe('generator', () => {
            it('should generate variables for all parts of composed variable', () => {
                const config = {} as ResolvedConfiguration;
                const theme = {
                    size: {
                        percentages: {
                            0: '0%',
                            25: '25%',
                            50: '50%',
                            75: '75%',
                            100: '100%'
                        }
                    }
                } as unknown as ResolvedTheme;
                const value = theme.size.percentages;
                const path = ['size.percentages'];

                expect(sizePercentagesGenerator.apply({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Size percentage variables',
                    ' */',
                    `--size-percentages-0: ${theme.size.percentages['0']};`,
                    `--size-percentages-25: ${theme.size.percentages['25']};`,
                    `--size-percentages-50: ${theme.size.percentages['50']};`,
                    `--size-percentages-75: ${theme.size.percentages['75']};`,
                    `--size-percentages-100: ${theme.size.percentages['100']};`
                ]);
            });
        });
    });

    describe('variants.size.multiplier', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'variants.size.multiplier';
                expect(sizeMultiplierVariantsGenerator.test.test(path)).toEqual(true);
            });
        });

        describe('generator', () => {
            it('should generate variables for all parts of composed variable', () => {
                const config = {} as ResolvedConfiguration;
                const theme = {
                    variants: {
                        size: {
                            multiplier: {
                                xs: { divide: 'var(--scale-ratio-pow-2)' },
                                sm: { divide: 'var(--scale-ratio-pow-1)' },
                                md: {},
                                lg: { multiply: 'var(--scale-ratio-pow-1)' },
                                xl: { multiply: 'var(--scale-ratio-pow-2)' }
                            }
                        }
                    }
                } as unknown as ResolvedTheme;
                const value = theme.variants.size.multiplier;
                const path = ['variants.size.multiplier'];

                expect(sizeMultiplierVariantsGenerator.apply({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Size multiplier variants variables',
                    ' */',
                    '--size-multiplier-xs: calc(var(--size-multiplier) / var(--scale-ratio-pow-2));',
                    '--size-multiplier-sm: calc(var(--size-multiplier) / var(--scale-ratio-pow-1));',
                    '--size-multiplier-md: var(--size-multiplier);',
                    '--size-multiplier-lg: calc(var(--size-multiplier) * var(--scale-ratio-pow-1));',
                    '--size-multiplier-xl: calc(var(--size-multiplier) * var(--scale-ratio-pow-2));'
                ]);
            });
        });
    });
});
