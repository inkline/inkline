import {
    alphaModifier,
    darkenModifier,
    desaturateModifier,
    fadeModifier,
    hueModifier,
    lightenModifier,
    lightnessModifier,
    opaquerModifier,
    rotateModifier,
    saturateModifier,
    saturationModifier
} from './colors';

describe('modifiers', () => {
    describe('colorModifiers', () => {
        describe('hue', () => {
            it('should correctly apply the hue modifier', () => {
                const color = { h: 0, s: 100, l: 50, a: 1 };
                hueModifier(color, 120);
                expect(color.h).toBe(120);
            });
        });

        describe('saturation', () => {
            it('should correctly apply the saturation modifier', () => {
                const color = { h: 0, s: 100, l: 50, a: 1 };
                saturationModifier(color, 50);
                expect(color.s).toBe(50);
            });
        });

        describe('lightness', () => {
            it('should correctly apply the lightness modifier', () => {
                const color = { h: 0, s: 100, l: 50, a: 1 };
                lightnessModifier(color, 25);
                expect(color.l).toBe(25);
            });
        });

        describe('alpha', () => {
            it('should correctly apply the alpha modifier', () => {
                const color = { h: 0, s: 100, l: 50, a: 1 };
                alphaModifier(color, 0.5);
                expect(color.a).toBe(0.5);
            });
        });

        describe('lighten', () => {
            it('should correctly apply the lighten modifier', () => {
                const color = {
                    h: 'var(--color-primary--h)',
                    s: 'var(--color-primary--s)',
                    l: 'var(--color-primary--l)',
                    a: 'var(--color-primary--a)'
                };
                lightenModifier(color, 10);
                expect(color.l).toBe('calc(var(--color-primary--l) + 10%)');
            });
        });

        describe('darken', () => {
            it('should correctly apply the darken modifier', () => {
                const color = {
                    h: 'var(--color-primary--h)',
                    s: 'var(--color-primary--s)',
                    l: 'var(--color-primary--l)',
                    a: 'var(--color-primary--a)'
                };
                darkenModifier(color, 10);
                expect(color.l).toBe('calc(var(--color-primary--l) - 10%)');
            });
        });

        describe('saturate', () => {
            it('should correctly apply the saturate modifier', () => {
                const color = {
                    h: 'var(--color-primary--h)',
                    s: 'var(--color-primary--s)',
                    l: 'var(--color-primary--l)',
                    a: 'var(--color-primary--a)'
                };
                saturateModifier(color, 0.2);
                expect(color.s).toBe(
                    'calc(var(--color-primary--s) + var(--color-primary--s) * 0.2)'
                );
            });
        });

        describe('desaturate', () => {
            it('should correctly apply the desaturate modifier', () => {
                const color = {
                    h: 'var(--color-primary--h)',
                    s: 'var(--color-primary--s)',
                    l: 'var(--color-primary--l)',
                    a: 'var(--color-primary--a)'
                };
                desaturateModifier(color, 0.2);
                expect(color.s).toBe(
                    'calc(var(--color-primary--s) - var(--color-primary--s) * 0.2)'
                );
            });
        });

        describe('rotate', () => {
            it('should correctly apply the rotate modifier', () => {
                const color = {
                    h: 'var(--color-primary--h)',
                    s: 'var(--color-primary--s)',
                    l: 'var(--color-primary--l)',
                    a: 'var(--color-primary--a)'
                };
                rotateModifier(color, 30);
                expect(color.h).toBe('calc(var(--color-primary--h) + 30)');
            });
        });

        describe('fade', () => {
            it('should correctly apply the fade modifier', () => {
                const color = {
                    h: 'var(--color-primary--h)',
                    s: 'var(--color-primary--s)',
                    l: 'var(--color-primary--l)',
                    a: 'var(--color-primary--a)'
                };
                fadeModifier(color, 0.2);
                expect(color.a).toBe(
                    'calc(var(--color-primary--a) - var(--color-primary--a) * 0.2)'
                );
            });
        });

        describe('opaquer', () => {
            it('should correctly apply the opaquer modifier', () => {
                const color = {
                    h: 'var(--color-primary--h)',
                    s: 'var(--color-primary--s)',
                    l: 'var(--color-primary--l)',
                    a: 'var(--color-primary--a)'
                };
                opaquerModifier(color, 0.2);
                expect(color.a).toBe(
                    'calc(var(--color-primary--a) + var(--color-primary--a) * 0.2)'
                );
            });
        });
    });
});
