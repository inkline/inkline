import { genericGenerator } from '../generic';
import { ResolvedConfiguration, ResolvedTheme } from '../../types';

describe('generators', () => {
    describe('generic', () => {
        describe('test', () => {
            it('should match any path', () => {
                const path = 'elements.body.color';
                expect((genericGenerator.test as RegExp).test(path)).toEqual(true);
            });
        });

        describe('generator', () => {
            it('should generate variables for simple values', () => {
                const config = {} as ResolvedConfiguration;
                const theme = {
                    elements: {
                        body: {
                            color: '#000000'
                        }
                    }
                } as unknown as ResolvedTheme;
                const value = theme.elements.body.color;
                const path = ['elements', 'body', 'color'];

                expect(genericGenerator.apply({ config, theme, value, path })).toEqual([
                    `--body--color: ${theme.elements.body.color};`
                ]);
            });

            it('should generate variables for composed values', () => {
                const config = {} as ResolvedConfiguration;
                const theme = {
                    elements: {
                        body: {
                            border: {
                                top: {
                                    style: 'solid'
                                }
                            }
                        }
                    }
                } as unknown as ResolvedTheme;
                const value = theme.elements.body.border.top.style;
                const path = ['elements', 'body', 'border', 'top', 'style'];

                expect(genericGenerator.apply({ config, theme, value, path })).toEqual([
                    `--body--border-top-style: ${theme.elements.body.border.top.style};`,
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
                const value = theme.elements.button.primary.background;
                const path = ['elements', 'button', 'primary', 'background'];

                expect(genericGenerator.apply({ config, theme, value, path })).toEqual([
                    `--button--primary--background: ${theme.elements.button.primary.background};`
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
                const value = theme.elements.buttonGroup.borderRadius;
                const path = ['elements', 'buttonGroup', 'borderRadius'];

                expect(genericGenerator.apply({ config, theme, value, path })).toEqual([
                    `--button-group--border-radius: ${theme.elements.buttonGroup.borderRadius};`
                ]);
            });
        });
    });
});
