import { resolveColor, colorsResolver, resolveColorVariant } from './colors';
import type { HSLAColor, RGBAColor } from '../types';
import { colorModifiers } from './modifiers';
import { createTestingResolverMeta } from '../__tests__/utils';

describe('resolvers', () => {
    describe('color', () => {
        const meta = createTestingResolverMeta({ path: ['colors'] });

        describe('resolveColor()', () => {
            it('should correctly resolve color from string', () => {
                const color = 'rgb(255, 0, 0)';
                const resolvedColor = resolveColor(color, meta);
                expect(resolvedColor).toEqual({ h: 0, s: 100, l: 50, a: 1 });
            });

            it('should correctly resolve color from string reference', () => {
                const color = 'var(--color-primary)';
                const resolvedColor = resolveColor(color, meta);
                expect(resolvedColor).toEqual({
                    h: 'var(--color-primary--h)',
                    s: 'var(--color-primary--s)',
                    l: 'var(--color-primary--l)',
                    a: 'var(--color-primary--a)'
                });
            });

            it('should correctly resolve color from RGBAColor', () => {
                const color: RGBAColor = { r: 255, g: 0, b: 0, a: 0.5 };
                const resolvedColor = resolveColor(color, meta);
                expect(resolvedColor).toEqual({ h: 0, s: 100, l: 50, a: 0.5 });
            });

            it('should correctly resolve color from HSLAColor', () => {
                const color: HSLAColor = { h: 120, s: 100, l: 50, a: 0.5 };
                const resolvedColor = resolveColor(color, meta);
                expect(resolvedColor).toEqual({ h: 120, s: 100, l: 50, a: 0.5 });
            });
        });

        describe('resolveColorVariant', () => {
            const meta = createTestingResolverMeta({ path: ['colorName', 'variantName'] });

            it('should correctly resolve a color variant', () => {
                const variant = {
                    lighten: 10,
                    darken: 20
                };

                const expected = {
                    h: 'var(--color-colorName--h)',
                    s: 'var(--color-colorName--s)',
                    l: 'calc(calc(var(--color-colorName--l) + 10%) - 20%)',
                    a: 'var(--color-colorName--a)'
                };

                expect(resolveColorVariant(variant, meta)).toEqual(expected);
            });

            it('should correctly apply color modifiers to a color variant', () => {
                const variant = {
                    lighten: 10,
                    darken: 20
                };

                const lightenSpy = vi.spyOn(colorModifiers, 'lighten');
                const darkenSpy = vi.spyOn(colorModifiers, 'darken');

                resolveColorVariant(variant, meta);

                expect(lightenSpy).toHaveBeenCalledWith(expect.any(Object), 10);
                expect(darkenSpy).toHaveBeenCalledWith(expect.any(Object), 20);
            });
        });

        describe('colorsResolver', () => {
            const meta = createTestingResolverMeta({ path: ['colors'] });

            it('should correctly resolve color from string', () => {
                const colors = { primary: 'rgb(255, 0, 0)' };
                const resolvedColors = colorsResolver.resolve(colors, meta);
                expect(resolvedColors).toEqual({
                    primary: { default: resolveColor('rgb(255, 0, 0)', meta) }
                });
            });

            it('should correctly resolve color from string reference', () => {
                const colors = { primary: 'var(--color-primary)' };
                const resolvedColors = colorsResolver.resolve(colors, meta);
                expect(resolvedColors).toEqual({
                    primary: { default: resolveColor('var(--color-primary)', meta) }
                });
            });

            it('should correctly resolve color from RGBAColor', () => {
                const colors = {
                    primary: { default: { r: 255, g: 0, b: 0, a: 0.5 } as RGBAColor }
                };
                const resolvedColors = colorsResolver.resolve(colors, meta);
                expect(resolvedColors).toEqual({
                    primary: { default: resolveColor({ r: 255, g: 0, b: 0, a: 0.5 }, meta) }
                });
            });

            it('should correctly resolve color from HSLAColor', () => {
                const colors = {
                    primary: { default: { h: 120, s: 100, l: 50, a: 0.5 } as HSLAColor }
                };
                const resolvedColors = colorsResolver.resolve(colors, meta);
                expect(resolvedColors).toEqual({
                    primary: { default: resolveColor({ h: 120, s: 100, l: 50, a: 0.5 }, meta) }
                });
            });

            it('should correctly resolve multiple colors', () => {
                const colors = {
                    primary: 'rgb(255, 0, 0)',
                    secondary: { default: { r: 0, g: 0, b: 255, a: 0.5 } as RGBAColor },
                    tertiary: { default: { h: 120, s: 100, l: 50, a: 0.5 } as HSLAColor }
                };
                const resolvedColors = colorsResolver.resolve(colors, meta);
                expect(resolvedColors).toEqual({
                    primary: { default: resolveColor('rgb(255, 0, 0)', meta) },
                    secondary: { default: resolveColor({ r: 0, g: 0, b: 255, a: 0.5 }, meta) },
                    tertiary: { default: resolveColor({ h: 120, s: 100, l: 50, a: 0.5 }, meta) }
                });
            });

            it('should correctly resolve color with variants', () => {
                const colors = {
                    primary: {
                        default: { h: 0, s: 100, l: 50, a: 1 },
                        light: { lighten: 10 },
                        dark: { darken: 10 },
                        faded: { fade: 0.2 },
                        opaque: { opaquer: 0.2 }
                    }
                };
                const resolvedColors = colorsResolver.resolve(colors, meta);
                expect(resolvedColors).toEqual({
                    primary: {
                        default: { h: 0, s: 100, l: 50, a: 1 },
                        light: {
                            h: 'var(--color-primary--h)',
                            s: 'var(--color-primary--s)',
                            l: 'calc(var(--color-primary--l) + 10%)',
                            a: 'var(--color-primary--a)'
                        },
                        dark: {
                            h: 'var(--color-primary--h)',
                            s: 'var(--color-primary--s)',
                            l: 'calc(var(--color-primary--l) - 10%)',
                            a: 'var(--color-primary--a)'
                        },
                        faded: {
                            h: 'var(--color-primary--h)',
                            s: 'var(--color-primary--s)',
                            l: 'var(--color-primary--l)',
                            a: 'calc(var(--color-primary--a) - var(--color-primary--a) * 0.2)'
                        },
                        opaque: {
                            h: 'var(--color-primary--h)',
                            s: 'var(--color-primary--s)',
                            l: 'var(--color-primary--l)',
                            a: 'calc(var(--color-primary--a) + var(--color-primary--a) * 0.2)'
                        }
                    }
                });
            });
        });
    });
});
