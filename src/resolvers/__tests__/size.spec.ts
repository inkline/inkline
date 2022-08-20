import { Configuration, Theme } from '../../types';
import {
    sizeMultiplierResolver,
    sizeMultiplierVariantResolver,
    sizePercentagesResolver
} from '../size';

describe('resolvers', () => {
    describe('size.multiplier', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'size.multiplier';
                expect(sizeMultiplierResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.size.multiplier';
                expect(sizeMultiplierResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'size.multiplier';
                expect(path.replace(sizeMultiplierResolver.test, sizeMultiplierResolver.set as string)).toEqual('size.multiplier');
            });

            it('should replace nested path', () => {
                const path = 'nested.size.multiplier';
                expect(path.replace(sizeMultiplierResolver.test, sizeMultiplierResolver.set as string)).toEqual('nested.size.multiplier');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '1';
                const path = ['size', 'multiplier'];

                expect(sizeMultiplierResolver.apply({ config, theme, value, path })).toEqual(value);
            });
        });
    });

    describe('variants.size.multiplier.[name]', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'variants.size.multiplier.xs';
                expect(sizeMultiplierVariantResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'variants.size.multiplier.xs';
                expect(path.replace(sizeMultiplierVariantResolver.test, sizeMultiplierVariantResolver.set as string)).toEqual('variants.size.multiplier.xs');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '100%';
                const path = ['variants', 'size', 'multiplier', 'xs'];

                expect(sizeMultiplierVariantResolver.apply({ config, theme, value, path })).toEqual(value);
            });
        });
    });

    describe('size.percentages.[name]', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'size.percentages.100';
                expect(sizePercentagesResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.size.percentages.100';
                expect(sizePercentagesResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'size.percentages.100';
                expect(path.replace(sizePercentagesResolver.test, sizePercentagesResolver.set as string)).toEqual('size.percentages.100');
            });

            it('should replace nested path', () => {
                const path = 'nested.size.percentages.100';
                expect(path.replace(sizePercentagesResolver.test, sizePercentagesResolver.set as string)).toEqual('nested.size.percentages.100');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '100%';
                const path = ['size', 'percentages', '100'];

                expect(sizePercentagesResolver.apply({ config, theme, value, path })).toEqual(value);
            });
        });
    });
});
