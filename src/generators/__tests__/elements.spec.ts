import { elementsGenerator } from '../elements';
import { ResolvedConfiguration, ResolvedTheme } from '../../types';

describe('generators', () => {
    describe('elements', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'elements.body.color';
                expect((elementsGenerator.test as RegExp).test(path)).toEqual(true);
            });
        });

        describe('generator', () => {
            it('should generate variables for simple values', () => {
                const config = {} as ResolvedConfiguration;
                const theme = {
                    elements: {
                        body: {
                            color: '#000000',
                            background: '#ffffff'
                        }
                    }
                } as unknown as ResolvedTheme;
                const value = theme.elements.body;
                const path = ['elements', 'body'];

                expect(elementsGenerator.apply({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Body variables',
                    ' */',
                    `--body--color: ${theme.elements.body.color};`,
                    `--body--background: ${theme.elements.body.background};`
                ]);
            });

            it('should generate variables for composed values', () => {
                const config = {} as ResolvedConfiguration;
                const theme = {
                    elements: {
                        body: {
                            color: '#000000',
                            background: '#ffffff',
                            border: {
                                top: {
                                    width: '1px',
                                    style: 'solid',
                                    color: '#000000'
                                }
                            }
                        }
                    }
                } as unknown as ResolvedTheme;
                const value = theme.elements.body;
                const path = ['elements', 'body'];

                expect(elementsGenerator.apply({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Body variables',
                    ' */',
                    `--body--color: ${theme.elements.body.color};`,
                    `--body--background: ${theme.elements.body.background};`,
                    `--body--border-top-width: ${theme.elements.body.border.top.width};`,
                    `--body--border-top-style: ${theme.elements.body.border.top.style};`,
                    `--body--border-top-color: ${theme.elements.body.border.top.color};`
                ]);
            });

            it('should generate variables for components', () => {
                const config = {} as ResolvedConfiguration;
                const theme = {
                    elements: {
                        button: {
                            primary: {
                                background: '#ff00ff'
                            }
                        }
                    }
                } as unknown as ResolvedTheme;
                const value = theme.elements.button;
                const path = ['elements', 'button'];

                expect(elementsGenerator.apply({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Button variables',
                    ' */',
                    `--button--primary--background: ${theme.elements.button.primary.background};`,
                ]);
            });

            it('should generate hyphenated variable names', () => {
                const config = {} as ResolvedConfiguration;
                const theme = {
                    elements: {
                        buttonGroup: {
                            borderRadius: 'var(--border-radius)'
                        }
                    }
                } as unknown as ResolvedTheme;
                const value = theme.elements.buttonGroup;
                const path = ['elements', 'buttonGroup'];

                expect(elementsGenerator.apply({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Button group variables',
                    ' */',
                    `--button-group--border-radius: ${theme.elements.buttonGroup.borderRadius};`
                ]);
            });
        });
    });
});
