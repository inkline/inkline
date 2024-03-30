import { paddingGenerator } from '../padding';
import { ResolvedConfiguration, ResolvedTheme } from '../../types';

describe('generators', () => {
    describe('padding', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'padding';
                expect((paddingGenerator.test as RegExp).test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.padding';
                expect((paddingGenerator.test as RegExp).test(path)).toEqual(true);
            });
        });

        describe('generator', () => {
            it('should generate variables for all sides and composed variable', () => {
                const config = {} as ResolvedConfiguration;
                const theme = {
                    padding: {
                        top: '1rem',
                        right: '1rem',
                        bottom: '1rem',
                        left: '1rem'
                    }
                } as ResolvedTheme;
                const value = theme.padding;
                const path = ['padding'];

                expect(paddingGenerator.apply({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Padding variables',
                    ' */',
                    `--padding-top: ${theme.padding.top};`,
                    `--padding-right: ${theme.padding.right};`,
                    `--padding-bottom: ${theme.padding.bottom};`,
                    `--padding-left: ${theme.padding.left};`,
                    '--padding: var(--padding-top) var(--padding-right) var(--padding-bottom) var(--padding-left);'
                ]);
            });
        });
    });
});
