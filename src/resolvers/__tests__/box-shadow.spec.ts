import { boxShadowResolvers } from '../box-shadow';
import { Configuration, Theme } from '../../types';

const [
    boxShadowResolver,
    boxShadowDefaultResolver,
    boxShadowFieldResolver
] = boxShadowResolvers();

describe('resolvers', () => {
    describe('boxShadow', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'boxShadow';
                expect(boxShadowResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.boxShadow';
                expect(boxShadowResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'boxShadow';
                expect(path.replace(boxShadowResolver.test, boxShadowResolver.set as string)).toEqual('boxShadow');
            });

            it('should replace nested path', () => {
                const path = 'nested.boxShadow';
                expect(path.replace(boxShadowResolver.test, boxShadowResolver.set as string)).toEqual('nested.boxShadow');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '1px 2px 3rem 4rem rgba(0,0,0,1)';
                const path = ['boxShadow'];

                expect(boxShadowResolver.resolve({ config, theme, value, path })).toEqual({
                    offsetX: '1px',
                    offsetY: '2px',
                    blurRadius: '3rem',
                    spreadRadius: '4rem',
                    color: 'rgba(0,0,0,1)'
                });
            });
        });
    });

    describe('boxShadow.default', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'boxShadow.default';
                expect(boxShadowDefaultResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.boxShadow.default';
                expect(boxShadowDefaultResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'boxShadow.default';
                expect(path.replace(boxShadowDefaultResolver.test, boxShadowDefaultResolver.set as string)).toEqual('boxShadow');
            });

            it('should replace nested path', () => {
                const path = 'nested.boxShadow.default';
                expect(path.replace(boxShadowDefaultResolver.test, boxShadowDefaultResolver.set as string)).toEqual('nested.boxShadow');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '1px 2px 3rem 4rem rgba(0,0,0,1)';
                const path = ['boxShadow', 'default'];

                expect(boxShadowDefaultResolver.resolve({ config, theme, value, path })).toEqual({
                    offsetX: '1px',
                    offsetY: '2px',
                    blurRadius: '3rem',
                    spreadRadius: '4rem',
                    color: 'rgba(0,0,0,1)'
                });
            });
        });
    });

    describe('boxShadow.[side]', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'boxShadow.offsetX';
                expect(boxShadowFieldResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.boxShadow.offsetX';
                expect(boxShadowFieldResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'boxShadow.offsetX';
                expect(path.replace(boxShadowFieldResolver.test, boxShadowFieldResolver.set as string)).toEqual('boxShadow.offsetX');
            });

            it('should replace nested path', () => {
                const path = 'nested.boxShadow.offsetX';
                expect(path.replace(boxShadowFieldResolver.test, boxShadowFieldResolver.set as string)).toEqual('nested.boxShadow.offsetX');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '1rem';
                const path = ['boxShadow', 'offsetX'];

                expect(boxShadowFieldResolver.resolve({ config, theme, value, path })).toEqual(value);
            });
        });
    });
});
