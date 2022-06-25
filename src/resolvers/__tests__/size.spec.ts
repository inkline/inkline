import { Configuration, Theme } from '../../types';
import { sizeResolvers } from '../size';

const [
    sizeMultiplierResolver,
    sizeMultiplierVariantsResolver,
    sizePercentagesFieldResolver
] = sizeResolvers();

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

                expect(sizeMultiplierResolver.resolve({ config, theme, value, path })).toEqual(value);
            });
        });
    });

    describe('variants.size.multiplier.[name]', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'variants.size.multiplier.xs';
                expect(sizeMultiplierVariantsResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'variants.size.multiplier.xs';
                expect(path.replace(sizeMultiplierVariantsResolver.test, sizeMultiplierVariantsResolver.set as string)).toEqual('variants.size.multiplier.xs');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '100%';
                const path = ['variants', 'size', 'multiplier', 'xs'];

                expect(sizeMultiplierVariantsResolver.resolve({ config, theme, value, path })).toEqual(value);
            });
        });
    });

    describe('size.percentages.[name]', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'size.percentages.100';
                expect(sizePercentagesFieldResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.size.percentages.100';
                expect(sizePercentagesFieldResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'size.percentages.100';
                expect(path.replace(sizePercentagesFieldResolver.test, sizePercentagesFieldResolver.set as string)).toEqual('size.percentages.100');
            });

            it('should replace nested path', () => {
                const path = 'nested.size.percentages.100';
                expect(path.replace(sizePercentagesFieldResolver.test, sizePercentagesFieldResolver.set as string)).toEqual('nested.size.percentages.100');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '100%';
                const path = ['size', 'percentages', '100'];

                expect(sizePercentagesFieldResolver.resolve({ config, theme, value, path })).toEqual(value);
            });
        });
    });
});
