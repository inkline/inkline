import { typographyResolvers } from '../typography';
import { Configuration, Theme } from '../../types';

const [
    lineHeightResolver,
    letterSpacingResolver,
    fontSizeResolver,
    fontSizeVariantsResolver,
    fontWeightResolver,
    fontFamilyResolver,
    fontFamilyGroupResolver,
    fontFamilyGroupTypeResolver
] = typographyResolvers();

describe('resolvers', () => {
    describe('lineHeight', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'typography.lineHeight';
                expect(lineHeightResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.typography.lineHeight';
                expect(lineHeightResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'typography.lineHeight';
                expect(path.replace(lineHeightResolver.test, lineHeightResolver.set as string)).toEqual('typography.lineHeight');
            });

            it('should replace nested path', () => {
                const path = 'nested.typography.lineHeight';
                expect(path.replace(lineHeightResolver.test, lineHeightResolver.set as string)).toEqual('nested.typography.lineHeight');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '1.5';
                const path = ['typography', 'lineHeight'];

                expect(lineHeightResolver.resolve({ config, theme, value, path })).toEqual(value);
            });
        });
    });

    describe('letterSpacing', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'typography.letterSpacing';
                expect(letterSpacingResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.typography.letterSpacing';
                expect(letterSpacingResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'typography.letterSpacing';
                expect(path.replace(letterSpacingResolver.test, letterSpacingResolver.set as string)).toEqual('typography.letterSpacing');
            });

            it('should replace nested path', () => {
                const path = 'nested.typography.letterSpacing';
                expect(path.replace(letterSpacingResolver.test, letterSpacingResolver.set as string)).toEqual('nested.typography.letterSpacing');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '0';
                const path = ['typography', 'letterSpacing'];

                expect(letterSpacingResolver.resolve({ config, theme, value, path })).toEqual(value);
            });
        });
    });

    describe('fontSize', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'typography.fontSize';
                expect(fontSizeResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.typography.fontSize';
                expect(fontSizeResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'typography.fontSize';
                expect(path.replace(fontSizeResolver.test, fontSizeResolver.set as string)).toEqual('typography.fontSize');
            });

            it('should replace nested path', () => {
                const path = 'nested.typography.fontSize';
                expect(path.replace(fontSizeResolver.test, fontSizeResolver.set as string)).toEqual('nested.typography.fontSize');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '12px';
                const path = ['typography', 'fontSize'];

                expect(fontSizeResolver.resolve({ config, theme, value, path })).toEqual(value);
            });
        });
    });
});
