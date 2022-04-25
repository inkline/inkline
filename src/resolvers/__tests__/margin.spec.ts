import { marginResolvers } from '../margin';
import { Configuration, Theme } from '../../types';

const [marginResolver, marginDefaultResolver, marginSideResolver] = marginResolvers();

describe('resolvers', () => {
    describe('margin', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'margin';
                expect(marginResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.margin';
                expect(marginResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'margin';
                expect(path.replace(marginResolver.test, marginResolver.set as string)).toEqual('margin');
            });

            it('should replace nested path', () => {
                const path = 'nested.margin';
                expect(path.replace(marginResolver.test, marginResolver.set as string)).toEqual('nested.margin');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '1rem';
                const path = ['margin'];

                expect(marginResolver.resolve({ config, theme, value, path })).toEqual({
                    top: '1rem',
                    right: '1rem',
                    bottom: '1rem',
                    left: '1rem'
                });
            });
        });
    });

    describe('margin.default', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'margin.default';
                expect(marginDefaultResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.margin.default';
                expect(marginDefaultResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'margin.default';
                expect(path.replace(marginDefaultResolver.test, marginDefaultResolver.set as string)).toEqual('margin');
            });

            it('should replace nested path', () => {
                const path = 'nested.margin.default';
                expect(path.replace(marginDefaultResolver.test, marginDefaultResolver.set as string)).toEqual('nested.margin');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '1rem';
                const path = ['margin', 'default'];

                expect(marginDefaultResolver.resolve({ config, theme, value, path })).toEqual({
                    top: '1rem',
                    right: '1rem',
                    bottom: '1rem',
                    left: '1rem'
                });
            });
        });
    });

    describe('margin.[side]', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'margin.top';
                expect(marginSideResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.margin.top';
                expect(marginSideResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'margin.top';
                expect(path.replace(marginSideResolver.test, marginSideResolver.set as string)).toEqual('margin.top');
            });

            it('should replace nested path', () => {
                const path = 'nested.margin.top';
                expect(path.replace(marginSideResolver.test, marginSideResolver.set as string)).toEqual('nested.margin.top');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '1rem';
                const path = ['margin', 'top'];

                expect(marginSideResolver.resolve({ config, theme, value, path })).toEqual(value);
            });
        });
    });
});
