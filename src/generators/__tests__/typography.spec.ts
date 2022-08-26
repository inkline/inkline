import { typographyFontFamilyGenerator } from '../typography';
import { ResolvedConfiguration, ResolvedTheme } from '../../types';

describe('generators', () => {
    describe('typographyFontFamilyGenerator', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'typography.fontFamily';
                expect(typographyFontFamilyGenerator.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.typography.fontFamily';
                expect(typographyFontFamilyGenerator.test.test(path)).toEqual(true);
            });
        });

        describe('generator', () => {
            it('should generate variables for all parts of composed variable', () => {
                const config = {} as ResolvedConfiguration;
                const theme = {
                    typography: {
                        fontWeight: {},
                        fontSize: '1rem',
                        lineHeight: '1rem',
                        letterSpacing: 0,
                        color: {},
                        fontFamily: {
                            primary: {
                                base: 'sans-serif1',
                                print: 'sans-serif2',
                                monospace: 'sans-serif3'
                            },
                            secondary: {
                                base: 'sans-serif4',
                                print: 'sans-serif5',
                                monospace: 'sans-serif6'
                            }
                        }
                    }
                } as unknown as ResolvedTheme;
                const value = theme.typography.fontFamily;
                const path = ['typography.fontFamily'];

                expect(typographyFontFamilyGenerator.apply({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Typography - Font family variables',
                    ' */',
                    '--font-family-primary-base: sans-serif1;',
                    '--font-family-primary-print: sans-serif2;',
                    '--font-family-primary-monospace: sans-serif3;',
                    '--font-family-secondary-base: sans-serif4;',
                    '--font-family-secondary-print: sans-serif5;',
                    '--font-family-secondary-monospace: sans-serif6;'
                ]);
            });
        });
    });
});
