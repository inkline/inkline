import { Configuration, Theme } from '../../types';
import { colorGenerators } from '../color';

const [colorGenerator] = colorGenerators();

describe('generators', () => {
    describe('color', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'color.light';
                expect(colorGenerator.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.color.light';
                expect(colorGenerator.test.test(path)).toEqual(true);
            });
        });

        describe('generator', () => {
            it('should generate h, s, l, a, and composed color variables', () => {
                const config = {} as Configuration;
                const theme = {
                    color: {
                        primary: {
                            h: 100,
                            s: 100,
                            l: 100,
                            a: 1
                        }
                    }
                } as unknown as Theme;
                const value = theme.color.primary;
                const path = ['color', 'primary'];

                expect(colorGenerator.generate({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Color primary variables',
                    ' */',
                    `--color-primary-h: ${theme.color.primary.h};`,
                    `--color-primary-s: ${theme.color.primary.s};`,
                    `--color-primary-l: ${theme.color.primary.l};`,
                    `--color-primary-a: ${theme.color.primary.a};`,
                    '--color-primary: hsla(var(--color-primary-h), var(--color-primary-s), var(--color-primary-l), var(--color-primary-a));'
                ]);
            });
        });
    });
});
