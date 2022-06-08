import { borderResolvers } from '../border';
import { Configuration, Theme } from '../../types';

const [
    borderResolver,
    borderDefaultResolver,
    borderFieldResolver,
    borderSideResolver,
    borderSideFieldResolver
] = borderResolvers();

describe('resolvers', () => {
    describe('border', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'border';
                expect(borderResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.border';
                expect(borderResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'border';
                expect(path.replace(borderResolver.test, borderResolver.set as string)).toEqual('border');
            });

            it('should replace nested path', () => {
                const path = 'nested.border';
                expect(path.replace(borderResolver.test, borderResolver.set as string)).toEqual('nested.border');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '1px solid #000000';
                const path = ['border'];

                expect(borderResolver.resolve({ config, theme, value, path })).toEqual({
                    top: { width: '1px', style: 'solid', color: '#000000' },
                    right: { width: '1px', style: 'solid', color: '#000000' },
                    bottom: { width: '1px', style: 'solid', color: '#000000' },
                    left: { width: '1px', style: 'solid', color: '#000000' }
                });
            });
        });
    });

    describe('border.default', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'border.default';
                expect(borderDefaultResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.border.default';
                expect(borderDefaultResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'border.default';
                expect(path.replace(borderDefaultResolver.test, borderDefaultResolver.set as string)).toEqual('border');
            });

            it('should replace nested path', () => {
                const path = 'nested.border.default';
                expect(path.replace(borderDefaultResolver.test, borderDefaultResolver.set as string)).toEqual('nested.border');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '1px solid #000000';
                const path = ['border', 'default'];

                expect(borderDefaultResolver.resolve({ config, theme, value, path })).toEqual({
                    top: { width: '1px', style: 'solid', color: '#000000' },
                    right: { width: '1px', style: 'solid', color: '#000000' },
                    bottom: { width: '1px', style: 'solid', color: '#000000' },
                    left: { width: '1px', style: 'solid', color: '#000000' }
                });
            });
        });
    });

    describe('border.[field]', () => {
        describe('test', () => {
            it('should match direct path', () => {
                expect(borderFieldResolver.test.test('border.width')).toEqual(true);
                expect(borderFieldResolver.test.test('border.style')).toEqual(true);
                expect(borderFieldResolver.test.test('border.color')).toEqual(true);
            });

            it('should match nested path', () => {
                expect(borderFieldResolver.test.test('nested.border.width')).toEqual(true);
                expect(borderFieldResolver.test.test('nested.border.style')).toEqual(true);
                expect(borderFieldResolver.test.test('nested.border.color')).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'border.width';

                expect(path.replace(borderFieldResolver.test, (borderFieldResolver.set as string[])[0])).toEqual('border.top.width');
                expect(path.replace(borderFieldResolver.test, (borderFieldResolver.set as string[])[1])).toEqual('border.right.width');
                expect(path.replace(borderFieldResolver.test, (borderFieldResolver.set as string[])[2])).toEqual('border.bottom.width');
                expect(path.replace(borderFieldResolver.test, (borderFieldResolver.set as string[])[3])).toEqual('border.left.width');
            });

            it('should replace nested path', () => {
                const path = 'nested.border.width';
                expect(path.replace(borderFieldResolver.test, (borderFieldResolver.set as string[])[0])).toEqual('nested.border.top.width');
                expect(path.replace(borderFieldResolver.test, (borderFieldResolver.set as string[])[1])).toEqual('nested.border.right.width');
                expect(path.replace(borderFieldResolver.test, (borderFieldResolver.set as string[])[2])).toEqual('nested.border.bottom.width');
                expect(path.replace(borderFieldResolver.test, (borderFieldResolver.set as string[])[3])).toEqual('nested.border.left.width');
            });
        });

        describe('resolve', () => {
            it('should return width field value', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '1px';
                const path = ['border', 'width'];

                expect(borderFieldResolver.resolve({ config, theme, value, path })).toEqual(value);
            });

            it('should return style field value', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = 'solid';
                const path = ['border', 'style'];

                expect(borderFieldResolver.resolve({ config, theme, value, path })).toEqual(value);
            });

            it('should return color field value', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '#000000';
                const path = ['border', 'color'];

                expect(borderFieldResolver.resolve({ config, theme, value, path })).toEqual(value);
            });
        });
    });

    describe('border.[side]', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'border.top';
                expect(borderSideResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.border.top';
                expect(borderSideResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'border.top';
                expect(path.replace(borderSideResolver.test, borderSideResolver.set as string)).toEqual('border.top');
            });

            it('should replace nested path', () => {
                const path = 'nested.border.top';
                expect(path.replace(borderSideResolver.test, borderSideResolver.set as string)).toEqual('nested.border.top');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '1px solid #000000';
                const path = ['border', 'top'];

                expect(borderSideResolver.resolve({ config, theme, value, path })).toEqual({
                    width: '1px',
                    style: 'solid',
                    color: '#000000'
                });
            });
        });
    });

    describe('border.[side].[field]', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'border.top.width';
                expect(borderSideFieldResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.border.top.width';
                expect(borderSideFieldResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'border.top.width';
                expect(path.replace(borderSideFieldResolver.test, borderSideFieldResolver.set as string)).toEqual('border.top.width');
            });

            it('should replace nested path', () => {
                const path = 'nested.border.top.width';
                expect(path.replace(borderSideFieldResolver.test, borderSideFieldResolver.set as string)).toEqual('nested.border.top.width');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '1px';
                const path = ['border', 'top', 'width'];

                expect(borderSideFieldResolver.resolve({ config, theme, value, path })).toEqual('1px');
            });
        });
    });
});
