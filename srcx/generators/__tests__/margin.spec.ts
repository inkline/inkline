import { marginGenerator } from '../margin';
import { ResolvedConfiguration, ResolvedTheme } from '../../types';

describe('generators', () => {
    describe('margin', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'margin';
                expect((marginGenerator.test as RegExp).test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.margin';
                expect((marginGenerator.test as RegExp).test(path)).toEqual(true);
            });
        });

        describe('generator', () => {
            it('should generate variables for all sides and composed variable', () => {
                const config = {} as ResolvedConfiguration;
                const theme = {
                    margin: {
                        top: '1rem',
                        right: '1rem',
                        bottom: '1rem',
                        left: '1rem'
                    }
                } as ResolvedTheme;
                const value = theme.margin;
                const path = ['margin'];

                expect(marginGenerator.apply({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Margin variables',
                    ' */',
                    `--margin-top: ${theme.margin.top};`,
                    `--margin-right: ${theme.margin.right};`,
                    `--margin-bottom: ${theme.margin.bottom};`,
                    `--margin-left: ${theme.margin.left};`,
                    '--margin: var(--margin-top) var(--margin-right) var(--margin-bottom) var(--margin-left);'
                ]);
            });
        });
    });

    describe('margin variants', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'variants.margin';
                expect((marginGenerator.test as RegExp).test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'variants.nested.margin';
                expect((marginGenerator.test as RegExp).test(path)).toEqual(true);
            });
        });

        describe('generator', () => {
            it('should generate variables for all sides and composed variable', () => {
                const config = {} as ResolvedConfiguration;
                const theme = {
                    margin: {
                        top: '1rem',
                        right: '1rem',
                        bottom: '1rem',
                        left: '1rem'
                    }
                } as ResolvedTheme;
                const value = theme.margin;
                const path = ['margin'];

                expect(marginGenerator.apply({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Margin variables',
                    ' */',
                    `--margin-top: ${theme.margin.top};`,
                    `--margin-right: ${theme.margin.right};`,
                    `--margin-bottom: ${theme.margin.bottom};`,
                    `--margin-left: ${theme.margin.left};`,
                    '--margin: var(--margin-top) var(--margin-right) var(--margin-bottom) var(--margin-left);'
                ]);
            });
        });
    });
});
