import { borderGenerators } from '../border';
import { Configuration, Theme } from '../../types';

const [borderGenerator] = borderGenerators();

describe('generators', () => {
    describe('border', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'border';
                expect(borderGenerator.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.border';
                expect(borderGenerator.test.test(path)).toEqual(true);
            });
        });

        describe('generator', () => {
            it('should generate variables for all sides and composed variable', () => {
                const config = {} as Configuration;
                const theme = {
                    border: {
                        top: {
                            width: '1rem',
                            style: 'solid',
                            color: '#000000'
                        },
                        right: {
                            width: '2rem',
                            style: 'dotted',
                            color: '#ff0000'
                        },
                        bottom: {
                            width: '3rem',
                            style: 'dashed',
                            color: '#00ff00'
                        },
                        left: {
                            width: '4rem',
                            style: 'double',
                            color: '#0000ff'
                        }
                    }
                } as Theme;
                const value = theme.border;
                const path = ['border'];

                expect(borderGenerator.generate({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Border variables',
                    ' */',
                    `--border-top-width: ${theme.border.top.width};`,
                    `--border-right-width: ${theme.border.right.width};`,
                    `--border-bottom-width: ${theme.border.bottom.width};`,
                    `--border-left-width: ${theme.border.left.width};`,
                    '--border-width: var(--border-top-width) var(--border-right-width) var(--border-bottom-width) var(--border-left-width);',
                    `--border-top-style: ${theme.border.top.style};`,
                    `--border-right-style: ${theme.border.right.style};`,
                    `--border-bottom-style: ${theme.border.bottom.style};`,
                    `--border-left-style: ${theme.border.left.style};`,
                    '--border-style: var(--border-top-style) var(--border-right-style) var(--border-bottom-style) var(--border-left-style);',
                    `--border-top-color: ${theme.border.top.color};`,
                    `--border-right-color: ${theme.border.right.color};`,
                    `--border-bottom-color: ${theme.border.bottom.color};`,
                    `--border-left-color: ${theme.border.left.color};`,
                    '--border-color: var(--border-top-color) var(--border-right-color) var(--border-bottom-color) var(--border-left-color);'
                ]);
            });
        });
    });
});
