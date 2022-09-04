import {
    borderRadiusResolver,
    borderRadiusDefaultResolver,
    borderRadiusCornerResolver,
    borderRadiusVariantResolver
} from '../border-radius';
import { Configuration, Theme } from '../../types';

describe('resolvers', () => {
    describe('borderRadius', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'borderRadius';
                expect((borderRadiusResolver.test as RegExp).test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.borderRadius';
                expect((borderRadiusResolver.test as RegExp).test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'borderRadius';
                expect(path.replace(borderRadiusResolver.test as RegExp, borderRadiusResolver.set as string)).toEqual('borderRadius');
            });

            it('should replace nested path', () => {
                const path = 'nested.borderRadius';
                expect(path.replace(borderRadiusResolver.test as RegExp, borderRadiusResolver.set as string)).toEqual('nested.borderRadius');
            });
        });

        describe('resolve', () => {
            it('should return value corners', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '1rem';
                const path = ['borderRadius'];

                expect(borderRadiusResolver.apply({ config, theme, value, path })).toEqual({
                    topLeft: '1rem',
                    topRight: '1rem',
                    bottomRight: '1rem',
                    bottomLeft: '1rem'
                });
            });
        });
    });

    describe('borderRadius.default', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'borderRadius.default';
                expect((borderRadiusDefaultResolver.test as RegExp).test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.borderRadius.default';
                expect((borderRadiusDefaultResolver.test as RegExp).test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'borderRadius.default';
                expect(path.replace(borderRadiusDefaultResolver.test as RegExp, borderRadiusDefaultResolver.set as string)).toEqual('borderRadius');
            });

            it('should replace nested path', () => {
                const path = 'nested.borderRadius.default';
                expect(path.replace(borderRadiusDefaultResolver.test as RegExp, borderRadiusDefaultResolver.set as string)).toEqual('nested.borderRadius');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '1rem';
                const path = ['borderRadius', 'default'];

                expect(borderRadiusDefaultResolver.apply({ config, theme, value, path })).toEqual({
                    topLeft: '1rem',
                    topRight: '1rem',
                    bottomRight: '1rem',
                    bottomLeft: '1rem'
                });
            });
        });
    });

    describe('borderRadius.[side]', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'borderRadius.topLeft';
                expect((borderRadiusCornerResolver.test as RegExp).test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.borderRadius.topLeft';
                expect((borderRadiusCornerResolver.test as RegExp).test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'borderRadius.topLeft';
                expect(path.replace(borderRadiusCornerResolver.test as RegExp, borderRadiusCornerResolver.set as string)).toEqual('borderRadius.topLeft');
            });

            it('should replace nested path', () => {
                const path = 'nested.borderRadius.topLeft';
                expect(path.replace(borderRadiusCornerResolver.test as RegExp, borderRadiusCornerResolver.set as string)).toEqual('nested.borderRadius.topLeft');
            });
        });

        describe('resolve', () => {
            it('should return value corners', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '1rem';
                const path = ['borderRadius', 'topLeft'];

                expect(borderRadiusCornerResolver.apply({ config, theme, value, path })).toEqual(value);
            });
        });
    });

    describe('variants.borderRadius.[variant]', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'variants.borderRadius.lg';
                expect((borderRadiusVariantResolver.test as RegExp).test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'variants.borderRadius.xl';
                expect(path.replace(borderRadiusVariantResolver.test as RegExp, borderRadiusVariantResolver.set as string)).toEqual('variants.borderRadius.xl');
            });
        });

        describe('resolve', () => {
            it('should return value sides from string', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '1rem';
                const path = ['variants', 'borderRadius', 'lg'];

                expect(borderRadiusVariantResolver.apply({ config, theme, value, path })).toEqual({
                    topLeft: value,
                    topRight: value,
                    bottomRight: value,
                    bottomLeft: value
                });
            });

            it('should return value sides from object', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = { topLeft: '1rem', bottomLeft: '2rem' };
                const path = ['variants', 'borderRadius', 'lg'];

                expect(borderRadiusVariantResolver.apply({ config, theme, value, path })).toEqual({
                    topLeft: value.topLeft,
                    bottomLeft: value.bottomLeft
                });
            });
        });
    });
});
