import { boxShadowGenerator } from '../box-shadow';
import { ResolvedConfiguration, ResolvedTheme } from '../../types';

describe('generators', () => {
    describe('boxShadow', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'boxShadow';
                expect(boxShadowGenerator.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.boxShadow';
                expect(boxShadowGenerator.test.test(path)).toEqual(true);
            });
        });

        describe('generator', () => {
            it('should generate variables for all parts of composed variable', () => {
                const config = {} as ResolvedConfiguration;
                const theme = {
                    boxShadow: {
                        offsetX: '1rem',
                        offsetY: '2rem',
                        blurRadius: '3rem',
                        spreadRadius: '4rem',
                        color: '#000000'
                    }
                } as ResolvedTheme;
                const value = theme.boxShadow;
                const path = ['boxShadow'];

                expect(boxShadowGenerator.apply({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Box shadow variables',
                    ' */',
                    `--box-shadow-offset-x: ${theme.boxShadow.offsetX};`,
                    `--box-shadow-offset-y: ${theme.boxShadow.offsetY};`,
                    `--box-shadow-blur-radius: ${theme.boxShadow.blurRadius};`,
                    `--box-shadow-spread-radius: ${theme.boxShadow.spreadRadius};`,
                    `--box-shadow-color: ${theme.boxShadow.color};`,
                    '--box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y) var(--box-shadow-blur-radius) var(--box-shadow-spread-radius) var(--box-shadow-color);'
                ]);
            });

            it('should generate variables with missing spreadRadius', () => {
                const config = {} as ResolvedConfiguration;
                const theme = {
                    boxShadow: {
                        offsetX: '1rem',
                        offsetY: '2rem',
                        blurRadius: '3rem',
                        color: '#000000'
                    }
                } as ResolvedTheme;
                const value = theme.boxShadow;
                const path = ['boxShadow'];

                expect(boxShadowGenerator.apply({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Box shadow variables',
                    ' */',
                    `--box-shadow-offset-x: ${theme.boxShadow.offsetX};`,
                    `--box-shadow-offset-y: ${theme.boxShadow.offsetY};`,
                    `--box-shadow-blur-radius: ${theme.boxShadow.blurRadius};`,
                    `--box-shadow-color: ${theme.boxShadow.color};`,
                    '--box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y) var(--box-shadow-blur-radius) var(--box-shadow-color);'
                ]);
            });

            it('should generate variables with missing spreadRadius and blurRadius', () => {
                const config = {} as ResolvedConfiguration;
                const theme = {
                    boxShadow: {
                        offsetX: '1rem',
                        offsetY: '2rem',
                        color: '#000000'
                    }
                } as ResolvedTheme;
                const value = theme.boxShadow;
                const path = ['boxShadow'];

                expect(boxShadowGenerator.apply({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Box shadow variables',
                    ' */',
                    `--box-shadow-offset-x: ${theme.boxShadow.offsetX};`,
                    `--box-shadow-offset-y: ${theme.boxShadow.offsetY};`,
                    `--box-shadow-color: ${theme.boxShadow.color};`,
                    '--box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y) var(--box-shadow-color);'
                ]);
            });
        });
    });
});
