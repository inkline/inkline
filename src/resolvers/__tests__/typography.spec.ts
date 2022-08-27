import {
    typographyLineHeightResolver,
    typographyLetterSpacingResolver,
    typographyFontSizeResolver
    // typographyFontSizeVariantResolver, // @TODO Write tests
    // typographyFontWeightResolver, // @TODO Write tests
    // typographyFontFamilyResolver, // @TODO Write tests
    // typographyFontFamilyGroupResolver, // @TODO Write tests
    // typographyFontFamilyGroupTypeResolver // @TODO Write tests
    // typographyContrastColorResolver // @TODO Write tests
} from '../typography';
import { Configuration, Theme } from '../../types';

describe('resolvers', () => {
    describe('lineHeight', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'typography.lineHeight';
                expect(typographyLineHeightResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.typography.lineHeight';
                expect(typographyLineHeightResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'typography.lineHeight';
                expect(path.replace(typographyLineHeightResolver.test, typographyLineHeightResolver.set as string)).toEqual('typography.lineHeight');
            });

            it('should replace nested path', () => {
                const path = 'nested.typography.lineHeight';
                expect(path.replace(typographyLineHeightResolver.test, typographyLineHeightResolver.set as string)).toEqual('nested.typography.lineHeight');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '1.5';
                const path = ['typography', 'lineHeight'];

                expect(typographyLineHeightResolver.apply({ config, theme, value, path })).toEqual(value);
            });
        });
    });

    describe('letterSpacing', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'typography.letterSpacing';
                expect(typographyLetterSpacingResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.typography.letterSpacing';
                expect(typographyLetterSpacingResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'typography.letterSpacing';
                expect(path.replace(typographyLetterSpacingResolver.test, typographyLetterSpacingResolver.set as string)).toEqual('typography.letterSpacing');
            });

            it('should replace nested path', () => {
                const path = 'nested.typography.letterSpacing';
                expect(path.replace(typographyLetterSpacingResolver.test, typographyLetterSpacingResolver.set as string)).toEqual('nested.typography.letterSpacing');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '0';
                const path = ['typography', 'letterSpacing'];

                expect(typographyLetterSpacingResolver.apply({ config, theme, value, path })).toEqual(value);
            });
        });
    });

    describe('fontSize', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'typography.fontSize';
                expect(typographyFontSizeResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.typography.fontSize';
                expect(typographyFontSizeResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'typography.fontSize';
                expect(path.replace(typographyFontSizeResolver.test, typographyFontSizeResolver.set as string)).toEqual('typography.fontSize');
            });

            it('should replace nested path', () => {
                const path = 'nested.typography.fontSize';
                expect(path.replace(typographyFontSizeResolver.test, typographyFontSizeResolver.set as string)).toEqual('nested.typography.fontSize');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = '12px';
                const path = ['typography', 'fontSize'];

                expect(typographyFontSizeResolver.apply({ config, theme, value, path })).toEqual(value);
            });
        });
    });
});
