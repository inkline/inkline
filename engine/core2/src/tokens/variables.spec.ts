import { nsvariables, variables } from './variables';
import { nsvariable, variable } from './variable';
import { hsla } from './color';
import { ref } from './ref';
import { expect } from 'vitest';
import { createContext } from '../context';

const options = { context: createContext() };

describe('nsvariables', () => {
    describe('animation', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    animation: 'slide 1s infinite normal'
                },
                options
            );

            const {
                namespaceAnimationName,
                namespaceAnimationDuration,
                namespaceAnimationIterationCount,
                namespaceAnimationDirection,
                namespaceAnimationDelay,
                namespaceAnimationFillMode,
                namespaceAnimationPlayState,
                namespaceAnimationTimingFunction,
                namespaceAnimation
            } = values;

            expect(namespaceAnimationName).toBeDefined();
            expect(namespaceAnimationDuration).toBeDefined();
            expect(namespaceAnimationIterationCount).toBeDefined();
            expect(namespaceAnimationDirection).toBeDefined();
            expect(namespaceAnimation).toBeDefined();
            expect(namespaceAnimationDelay).toBeDefined();
            expect(namespaceAnimationFillMode).toBeDefined();
            expect(namespaceAnimationPlayState).toBeDefined();
            expect(namespaceAnimationTimingFunction).toBeDefined();
        });

        it('should return an object from string value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    animation: '3s ease-in 1s 2 reverse both paused slide-in'
                },
                options
            );

            expect(values).toEqual({
                namespaceAnimationName: nsvariable(ns, 'animation-name', 'slide-in', options),
                namespaceAnimationDuration: nsvariable(ns, 'animation-duration', '3s', options),
                namespaceAnimationIterationCount: nsvariable(
                    ns,
                    'animation-iteration-count',
                    '2',
                    options
                ),
                namespaceAnimationDelay: nsvariable(ns, 'animation-delay', '1s', options),
                namespaceAnimationFillMode: nsvariable(ns, 'animation-fill-mode', 'both', options),
                namespaceAnimationPlayState: nsvariable(
                    ns,
                    'animation-play-state',
                    'paused',
                    options
                ),
                namespaceAnimationDirection: nsvariable(
                    ns,
                    'animation-direction',
                    'reverse',
                    options
                ),
                namespaceAnimationTimingFunction: nsvariable(
                    ns,
                    'animation-timing-function',
                    'ease-in',
                    options
                ),
                namespaceAnimation: nsvariable(
                    ns,
                    'animation',
                    [
                        ref(values.namespaceAnimationName),
                        ref(values.namespaceAnimationDuration),
                        ref(values.namespaceAnimationIterationCount),
                        ref(values.namespaceAnimationDirection)
                    ],
                    options
                )
            });
        });

        it('should return an object from object value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    animation: {
                        name: 'slide',
                        duration: '1s',
                        iterationCount: 'infinite',
                        direction: 'normal'
                    }
                },
                options
            );

            expect(values).toEqual({
                namespaceAnimationName: nsvariable(ns, 'animation-name', 'slide', options),
                namespaceAnimationDuration: nsvariable(ns, 'animation-duration', '1s', options),
                namespaceAnimationIterationCount: nsvariable(
                    ns,
                    'animation-iteration-count',
                    'infinite',
                    options
                ),
                namespaceAnimationDirection: nsvariable(
                    ns,
                    'animation-direction',
                    'normal',
                    options
                ),
                namespaceAnimationDelay: nsvariable(ns, 'animation-delay', 0, options),
                namespaceAnimationFillMode: nsvariable(ns, 'animation-fill-mode', 'none', options),
                namespaceAnimationPlayState: nsvariable(
                    ns,
                    'animation-play-state',
                    'running',
                    options
                ),
                namespaceAnimationTimingFunction: nsvariable(
                    ns,
                    'animation-timing-function',
                    'linear',
                    options
                ),
                namespaceAnimation: nsvariable(
                    ns,
                    'animation',
                    [
                        ref(nsvariable(ns, 'animation-name', '', options)),
                        ref(nsvariable(ns, 'animation-duration', '', options)),
                        ref(nsvariable(ns, 'animation-iteration-count', '', options)),
                        ref(nsvariable(ns, 'animation-direction', '', options))
                    ],
                    options
                )
            });
        });
    });

    describe('border', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    border: '1px solid red'
                },
                options
            );

            const {
                namespaceBorderTop,
                namespaceBorderTopWidth,
                namespaceBorderTopStyle,
                namespaceBorderTopColor,
                namespaceBorderRight,
                namespaceBorderRightWidth,
                namespaceBorderRightStyle,
                namespaceBorderRightColor,
                namespaceBorderBottom,
                namespaceBorderBottomWidth,
                namespaceBorderBottomStyle,
                namespaceBorderBottomColor,
                namespaceBorderLeft,
                namespaceBorderLeftWidth,
                namespaceBorderLeftStyle,
                namespaceBorderLeftColor,
                namespaceBorderWidth,
                namespaceBorderStyle,
                namespaceBorderColor,
                namespaceBorder
            } = values;

            expect(namespaceBorderTop).toBeDefined();
            expect(namespaceBorderTopWidth).toBeDefined();
            expect(namespaceBorderTopStyle).toBeDefined();
            expect(namespaceBorderTopColor).toBeDefined();
            expect(namespaceBorderRight).toBeDefined();
            expect(namespaceBorderRightWidth).toBeDefined();
            expect(namespaceBorderRightStyle).toBeDefined();
            expect(namespaceBorderRightColor).toBeDefined();
            expect(namespaceBorderBottom).toBeDefined();
            expect(namespaceBorderBottomWidth).toBeDefined();
            expect(namespaceBorderBottomStyle).toBeDefined();
            expect(namespaceBorderBottomColor).toBeDefined();
            expect(namespaceBorderLeft).toBeDefined();
            expect(namespaceBorderLeftWidth).toBeDefined();
            expect(namespaceBorderLeftStyle).toBeDefined();
            expect(namespaceBorderLeftColor).toBeDefined();
            expect(namespaceBorderWidth).toBeDefined();
            expect(namespaceBorderStyle).toBeDefined();
            expect(namespaceBorderColor).toBeDefined();
            expect(namespaceBorder).toBeDefined();
        });

        it('should return an object from string value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    border: '1px solid red'
                },
                options
            );

            expect(values).toEqual({
                namespaceBorderTop: nsvariable(
                    ns,
                    'border-top',
                    [
                        ref(nsvariable(ns, 'border-top-width', '', options)),
                        ref(nsvariable(ns, 'border-top-style', '', options)),
                        ref(nsvariable(ns, 'border-top-color', '', options))
                    ],
                    options
                ),
                namespaceBorderTopWidth: nsvariable(ns, 'border-top-width', '1px', options),
                namespaceBorderTopStyle: nsvariable(ns, 'border-top-style', 'solid', options),
                namespaceBorderTopColor: nsvariable(
                    ns,
                    'border-top-color',
                    hsla([0, '100%', '50%', 1]),
                    options
                ),
                namespaceBorderRight: nsvariable(
                    ns,
                    'border-right',
                    [
                        ref(nsvariable(ns, 'border-right-width', '', options)),
                        ref(nsvariable(ns, 'border-right-style', '', options)),
                        ref(nsvariable(ns, 'border-right-color', '', options))
                    ],
                    options
                ),
                namespaceBorderRightWidth: nsvariable(ns, 'border-right-width', '1px', options),
                namespaceBorderRightStyle: nsvariable(ns, 'border-right-style', 'solid', options),
                namespaceBorderRightColor: nsvariable(
                    ns,
                    'border-right-color',
                    hsla([0, '100%', '50%', 1]),
                    options
                ),
                namespaceBorderBottom: nsvariable(
                    ns,
                    'border-bottom',
                    [
                        ref(nsvariable(ns, 'border-bottom-width', '', options)),
                        ref(nsvariable(ns, 'border-bottom-style', '', options)),
                        ref(nsvariable(ns, 'border-bottom-color', '', options))
                    ],
                    options
                ),
                namespaceBorderBottomWidth: nsvariable(ns, 'border-bottom-width', '1px', options),
                namespaceBorderBottomStyle: nsvariable(ns, 'border-bottom-style', 'solid', options),
                namespaceBorderBottomColor: nsvariable(
                    ns,
                    'border-bottom-color',
                    hsla([0, '100%', '50%', 1]),
                    options
                ),
                namespaceBorderLeft: nsvariable(
                    ns,
                    'border-left',
                    [
                        ref(nsvariable(ns, 'border-left-width', '', options)),
                        ref(nsvariable(ns, 'border-left-style', '', options)),
                        ref(nsvariable(ns, 'border-left-color', '', options))
                    ],
                    options
                ),
                namespaceBorderLeftWidth: nsvariable(ns, 'border-left-width', '1px', options),
                namespaceBorderLeftStyle: nsvariable(ns, 'border-left-style', 'solid', options),
                namespaceBorderLeftColor: nsvariable(
                    ns,
                    'border-left-color',
                    hsla([0, '100%', '50%', 1]),
                    options
                ),
                namespaceBorderWidth: nsvariable(
                    ns,
                    'border-width',
                    [
                        ref(nsvariable(ns, 'border-top-width', '', options)),
                        ref(nsvariable(ns, 'border-right-width', '', options)),
                        ref(nsvariable(ns, 'border-bottom-width', '', options)),
                        ref(nsvariable(ns, 'border-left-width', '', options))
                    ],
                    options
                ),
                namespaceBorderStyle: nsvariable(
                    ns,
                    'border-style',
                    [
                        ref(nsvariable(ns, 'border-top-style', '', options)),
                        ref(nsvariable(ns, 'border-right-style', '', options)),
                        ref(nsvariable(ns, 'border-bottom-style', '', options)),
                        ref(nsvariable(ns, 'border-left-style', '', options))
                    ],
                    options
                ),
                namespaceBorderColor: nsvariable(
                    ns,
                    'border-color',
                    [
                        ref(nsvariable(ns, 'border-top-color', '', options)),
                        ref(nsvariable(ns, 'border-right-color', '', options)),
                        ref(nsvariable(ns, 'border-bottom-color', '', options)),
                        ref(nsvariable(ns, 'border-left-color', '', options))
                    ],
                    options
                ),
                namespaceBorder: nsvariable(
                    ns,
                    'border',
                    [
                        ref(nsvariable(ns, 'border-top-width', '', options)),
                        ref(nsvariable(ns, 'border-top-style', '', options)),
                        ref(nsvariable(ns, 'border-top-color', '', options))
                    ],
                    options
                )
            });
        });
    });

    describe('borderRadius', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    borderRadius: '1px'
                },
                options
            );

            const {
                namespaceBorderTopLeftRadius,
                namespaceBorderTopRightRadius,
                namespaceBorderBottomRightRadius,
                namespaceBorderBottomLeftRadius,
                namespaceBorderRadius
            } = values;

            expect(namespaceBorderTopLeftRadius).toBeDefined();
            expect(namespaceBorderTopRightRadius).toBeDefined();
            expect(namespaceBorderBottomRightRadius).toBeDefined();
            expect(namespaceBorderBottomLeftRadius).toBeDefined();
            expect(namespaceBorderRadius).toBeDefined();
        });

        it('should return an object from 1-part string value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    borderRadius: '1px'
                },
                options
            );

            expect(values).toEqual({
                namespaceBorderTopLeftRadius: nsvariable(
                    ns,
                    'border-top-left-radius',
                    '1px',
                    options
                ),
                namespaceBorderTopRightRadius: nsvariable(
                    ns,
                    'border-top-right-radius',
                    '1px',
                    options
                ),
                namespaceBorderBottomRightRadius: nsvariable(
                    ns,
                    'border-bottom-right-radius',
                    '1px',
                    options
                ),
                namespaceBorderBottomLeftRadius: nsvariable(
                    ns,
                    'border-bottom-left-radius',
                    '1px',
                    options
                ),
                namespaceBorderRadius: nsvariable(
                    ns,
                    'border-radius',
                    [
                        ref(nsvariable(ns, 'border-top-left-radius', '', options)),
                        ref(nsvariable(ns, 'border-top-right-radius', '', options)),
                        ref(nsvariable(ns, 'border-bottom-right-radius', '', options)),
                        ref(nsvariable(ns, 'border-bottom-left-radius', '', options))
                    ],
                    options
                )
            });
        });

        it('should return an object from 4-part string value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    borderRadius: '1px 1px 1px 1px'
                },
                options
            );

            expect(values).toEqual({
                namespaceBorderTopLeftRadius: nsvariable(
                    ns,
                    'border-top-left-radius',
                    '1px',
                    options
                ),
                namespaceBorderTopRightRadius: nsvariable(
                    ns,
                    'border-top-right-radius',
                    '1px',
                    options
                ),
                namespaceBorderBottomRightRadius: nsvariable(
                    ns,
                    'border-bottom-right-radius',
                    '1px',
                    options
                ),
                namespaceBorderBottomLeftRadius: nsvariable(
                    ns,
                    'border-bottom-left-radius',
                    '1px',
                    options
                ),
                namespaceBorderRadius: nsvariable(
                    ns,
                    'border-radius',
                    [
                        ref(nsvariable(ns, 'border-top-left-radius', '', options)),
                        ref(nsvariable(ns, 'border-top-right-radius', '', options)),
                        ref(nsvariable(ns, 'border-bottom-right-radius', '', options)),
                        ref(nsvariable(ns, 'border-bottom-left-radius', '', options))
                    ],
                    options
                )
            });
        });

        it('should return an object from object value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    borderRadius: {
                        topLeft: '1px',
                        topRight: '1px',
                        bottomRight: '1px',
                        bottomLeft: '1px'
                    }
                },
                options
            );

            expect(values).toEqual({
                namespaceBorderTopLeftRadius: nsvariable(
                    ns,
                    'border-top-left-radius',
                    '1px',
                    options
                ),
                namespaceBorderTopRightRadius: nsvariable(
                    ns,
                    'border-top-right-radius',
                    '1px',
                    options
                ),
                namespaceBorderBottomRightRadius: nsvariable(
                    ns,
                    'border-bottom-right-radius',
                    '1px',
                    options
                ),
                namespaceBorderBottomLeftRadius: nsvariable(
                    ns,
                    'border-bottom-left-radius',
                    '1px',
                    options
                ),
                namespaceBorderRadius: nsvariable(
                    ns,
                    'border-radius',
                    [
                        ref(nsvariable(ns, 'border-top-left-radius', '', options)),
                        ref(nsvariable(ns, 'border-top-right-radius', '', options)),
                        ref(nsvariable(ns, 'border-bottom-right-radius', '', options)),
                        ref(nsvariable(ns, 'border-bottom-left-radius', '', options))
                    ],
                    options
                )
            });
        });
    });

    describe('boxShadow', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    boxShadow: '1px 1px 0px 0px red'
                },
                options
            );

            const {
                namespaceBoxShadowOffsetX,
                namespaceBoxShadowOffsetY,
                namespaceBoxShadowBlurRadius,
                namespaceBoxShadowSpreadRadius,
                namespaceBoxShadowColor,
                namespaceBoxShadow
            } = values;

            expect(namespaceBoxShadowOffsetX).toBeDefined();
            expect(namespaceBoxShadowOffsetY).toBeDefined();
            expect(namespaceBoxShadowBlurRadius).toBeDefined();
            expect(namespaceBoxShadowSpreadRadius).toBeDefined();
            expect(namespaceBoxShadowColor).toBeDefined();
            expect(namespaceBoxShadow).toBeDefined();
        });

        it('should return an object from string value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    boxShadow: '1px 1px 0px 0px red'
                },
                options
            );

            expect(values).toEqual({
                namespaceBoxShadowOffsetX: nsvariable(ns, 'box-shadow-offset-x', '1px', options),
                namespaceBoxShadowOffsetY: nsvariable(ns, 'box-shadow-offset-y', '1px', options),
                namespaceBoxShadowBlurRadius: nsvariable(
                    ns,
                    'box-shadow-blur-radius',
                    '0px',
                    options
                ),
                namespaceBoxShadowSpreadRadius: nsvariable(
                    ns,
                    'box-shadow-spread-radius',
                    '0px',
                    options
                ),
                namespaceBoxShadowColor: nsvariable(ns, 'box-shadow-color', 'red', options),
                namespaceBoxShadow: nsvariable(
                    ns,
                    'box-shadow',
                    [
                        ref(values.namespaceBoxShadowOffsetX),
                        ref(values.namespaceBoxShadowOffsetY),
                        ref(values.namespaceBoxShadowBlurRadius),
                        ref(values.namespaceBoxShadowSpreadRadius),
                        ref(values.namespaceBoxShadowColor)
                    ],
                    options
                )
            });
        });

        it('should return an object from object value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    boxShadow: {
                        offsetX: '1px',
                        offsetY: '1px',
                        blurRadius: '1px',
                        spreadRadius: '0px',
                        color: 'red'
                    }
                },
                options
            );

            expect(values).toEqual({
                namespaceBoxShadowOffsetX: nsvariable(ns, 'box-shadow-offset-x', '1px', options),
                namespaceBoxShadowOffsetY: nsvariable(ns, 'box-shadow-offset-y', '1px', options),
                namespaceBoxShadowBlurRadius: nsvariable(
                    ns,
                    'box-shadow-blur-radius',
                    '1px',
                    options
                ),
                namespaceBoxShadowSpreadRadius: nsvariable(
                    ns,
                    'box-shadow-spread-radius',
                    '0px',
                    options
                ),
                namespaceBoxShadowColor: nsvariable(ns, 'box-shadow-color', 'red', options),
                namespaceBoxShadow: nsvariable(
                    ns,
                    'box-shadow',
                    [
                        ref(nsvariable(ns, 'box-shadow-offset-x', '', options)),
                        ref(nsvariable(ns, 'box-shadow-offset-y', '', options)),
                        ref(nsvariable(ns, 'box-shadow-blur-radius', '', options)),
                        ref(nsvariable(ns, 'box-shadow-spread-radius', '', options)),
                        ref(nsvariable(ns, 'box-shadow-color', '', options))
                    ],
                    options
                )
            });
        });
    });

    describe('background', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    background: 'red'
                },
                options
            );

            const { namespaceBackground } = values;

            expect(namespaceBackground).toBeDefined();
        });

        it('should return an object from string value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    background: 'red'
                },
                options
            );

            expect(values).toEqual({
                namespaceBackground: nsvariable(
                    ns,
                    'background',
                    hsla([0, '100%', '50%', 1]),
                    options
                )
            });
        });

        it('should return an object from object value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    background: {
                        h: 0,
                        s: '100%',
                        l: '50%',
                        a: 1
                    }
                },
                options
            );

            expect(values).toEqual({
                namespaceBackground: nsvariable(
                    ns,
                    'background',
                    hsla([0, '100%', '50%', 1]),
                    options
                )
            });
        });
    });

    describe('color', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    color: 'red'
                },
                options
            );

            const { namespaceColor } = values;

            expect(namespaceColor).toBeDefined();
        });

        it('should return an object from string value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    color: 'red'
                },
                options
            );

            expect(values).toEqual({
                namespaceColor: nsvariable(ns, 'color', hsla([0, '100%', '50%', 1]), options)
            });
        });

        it('should return an object from object value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    color: {
                        h: 0,
                        s: '100%',
                        l: '50%',
                        a: 1
                    }
                },
                options
            );

            expect(values).toEqual({
                namespaceColor: nsvariable(ns, 'color', hsla([0, '100%', '50%', 1]), options)
            });
        });
    });

    describe('margin', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    margin: '1px'
                },
                options
            );

            const {
                namespaceMarginTop,
                namespaceMarginRight,
                namespaceMarginBottom,
                namespaceMarginLeft,
                namespaceMargin
            } = values;

            expect(namespaceMarginTop).toBeDefined();
            expect(namespaceMarginRight).toBeDefined();
            expect(namespaceMarginBottom).toBeDefined();
            expect(namespaceMarginLeft).toBeDefined();
            expect(namespaceMargin).toBeDefined();
        });

        it('should return an object from string value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    margin: '1px'
                },
                options
            );

            expect(values).toEqual({
                namespaceMarginTop: nsvariable(ns, 'margin-top', '1px', options),
                namespaceMarginRight: nsvariable(ns, 'margin-right', '1px', options),
                namespaceMarginBottom: nsvariable(ns, 'margin-bottom', '1px', options),
                namespaceMarginLeft: nsvariable(ns, 'margin-left', '1px', options),
                namespaceMargin: nsvariable(
                    ns,
                    'margin',
                    [
                        ref(values.namespaceMarginTop),
                        ref(values.namespaceMarginRight),
                        ref(values.namespaceMarginBottom),
                        ref(values.namespaceMarginLeft)
                    ],
                    options
                )
            });
        });

        it('should return an object from object value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    margin: {
                        top: '1px',
                        right: '1px',
                        bottom: '1px',
                        left: '1px'
                    }
                },
                options
            );

            expect(values).toEqual({
                namespaceMarginTop: nsvariable(ns, 'margin-top', '1px', options),
                namespaceMarginRight: nsvariable(ns, 'margin-right', '1px', options),
                namespaceMarginBottom: nsvariable(ns, 'margin-bottom', '1px', options),
                namespaceMarginLeft: nsvariable(ns, 'margin-left', '1px', options),
                namespaceMargin: nsvariable(
                    ns,
                    'margin',
                    [
                        ref(nsvariable(ns, 'margin-top', '', options)),
                        ref(nsvariable(ns, 'margin-right', '', options)),
                        ref(nsvariable(ns, 'margin-bottom', '', options)),
                        ref(nsvariable(ns, 'margin-left', '', options))
                    ],
                    options
                )
            });
        });
    });

    describe('padding', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    padding: '1px'
                },
                options
            );

            const {
                namespacePaddingTop,
                namespacePaddingRight,
                namespacePaddingBottom,
                namespacePaddingLeft,
                namespacePadding
            } = values;

            expect(namespacePaddingTop).toBeDefined();
            expect(namespacePaddingRight).toBeDefined();
            expect(namespacePaddingBottom).toBeDefined();
            expect(namespacePaddingLeft).toBeDefined();
            expect(namespacePadding).toBeDefined();
        });

        it('should return an object from string value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    padding: '1px'
                },
                options
            );

            expect(values).toEqual({
                namespacePaddingTop: nsvariable(ns, 'padding-top', '1px', options),
                namespacePaddingRight: nsvariable(ns, 'padding-right', '1px', options),
                namespacePaddingBottom: nsvariable(ns, 'padding-bottom', '1px', options),
                namespacePaddingLeft: nsvariable(ns, 'padding-left', '1px', options),
                namespacePadding: nsvariable(
                    ns,
                    'padding',
                    [
                        ref(values.namespacePaddingTop),
                        ref(values.namespacePaddingRight),
                        ref(values.namespacePaddingBottom),
                        ref(values.namespacePaddingLeft)
                    ],
                    options
                )
            });
        });

        it('should return an object from object value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    padding: {
                        top: '1px',
                        right: '1px',
                        bottom: '1px',
                        left: '1px'
                    }
                },
                options
            );

            expect(values).toEqual({
                namespacePaddingTop: nsvariable(ns, 'padding-top', '1px', options),
                namespacePaddingRight: nsvariable(ns, 'padding-right', '1px', options),
                namespacePaddingBottom: nsvariable(ns, 'padding-bottom', '1px', options),
                namespacePaddingLeft: nsvariable(ns, 'padding-left', '1px', options),
                namespacePadding: nsvariable(
                    ns,
                    'padding',
                    [
                        ref(nsvariable(ns, 'padding-top', '', options)),
                        ref(nsvariable(ns, 'padding-right', '', options)),
                        ref(nsvariable(ns, 'padding-bottom', '', options)),
                        ref(nsvariable(ns, 'padding-left', '', options))
                    ],
                    options
                )
            });
        });
    });

    describe('transition', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    transition: 'color 1s ease-in-out'
                },
                options
            );

            const {
                namespaceTransitionProperty,
                namespaceTransitionDuration,
                namespaceTransitionTimingFunction,
                namespaceTransition
            } = values;

            expect(namespaceTransitionProperty).toBeDefined();
            expect(namespaceTransitionDuration).toBeDefined();
            expect(namespaceTransitionTimingFunction).toBeDefined();
            expect(namespaceTransition).toBeDefined();
        });

        it('should return an object from string value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    transition: 'color 1s ease-in-out'
                },
                options
            );

            expect(values).toEqual({
                namespaceTransitionProperty: nsvariable(
                    ns,
                    'transition-property',
                    'color',
                    options
                ),
                namespaceTransitionDuration: nsvariable(ns, 'transition-duration', '1s', options),
                namespaceTransitionTimingFunction: nsvariable(
                    ns,
                    'transition-timing-function',
                    'ease-in-out',
                    options
                ),
                namespaceTransition: nsvariable(
                    ns,
                    'transition',
                    [
                        ref(values.namespaceTransitionProperty),
                        ref(values.namespaceTransitionDuration),
                        ref(values.namespaceTransitionTimingFunction)
                    ],
                    options
                )
            });
        });

        it('should return an object from object value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    transition: {
                        property: 'color',
                        duration: '1s',
                        timingFunction: 'ease-in-out'
                    }
                },
                options
            );

            expect(values).toEqual({
                namespaceTransitionProperty: nsvariable(
                    ns,
                    'transition-property',
                    'color',
                    options
                ),
                namespaceTransitionDuration: nsvariable(ns, 'transition-duration', '1s', options),
                namespaceTransitionTimingFunction: nsvariable(
                    ns,
                    'transition-timing-function',
                    'ease-in-out',
                    options
                ),
                namespaceTransition: nsvariable(
                    ns,
                    'transition',
                    [
                        ref(nsvariable(ns, 'transition-property', '', options)),
                        ref(nsvariable(ns, 'transition-duration', '', options)),
                        ref(nsvariable(ns, 'transition-timing-function', '', options))
                    ],
                    options
                )
            });
        });
    });

    describe('generic', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    custom: 'value'
                },
                options
            );

            const { namespaceCustom } = values;

            expect(namespaceCustom).toBeDefined();
        });

        it('should return an object from string value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    custom: 'value'
                },
                options
            );

            expect(values).toEqual({
                namespaceCustom: nsvariable(ns, 'custom', 'value', options)
            });
        });

        it('should return an object from object token value', () => {
            const ns = 'namespace';
            const variableValue = ref('variable');
            const values = nsvariables(
                ns,
                {
                    custom: variableValue
                },
                options
            );

            const { namespaceCustom } = values;

            expect(values).toEqual({
                namespaceCustom: nsvariable(ns, 'custom', variableValue, options)
            });
            expect(namespaceCustom).toBeDefined();
        });
    });

    describe('nesting', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    custom: {
                        nested: 'value'
                    }
                },
                options
            );

            const { namespaceCustomNested } = values;

            expect(namespaceCustomNested).toBeDefined();
        });

        it('should return an object with namespaced properties from output map property', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    custom: {
                        margin: '1px'
                    }
                },
                options
            );

            const {
                namespaceCustomMargin,
                namespaceCustomMarginTop,
                namespaceCustomMarginRight,
                namespaceCustomMarginBottom,
                namespaceCustomMarginLeft
            } = values;

            expect(namespaceCustomMargin).toBeDefined();
            expect(namespaceCustomMarginTop).toBeDefined();
            expect(namespaceCustomMarginRight).toBeDefined();
            expect(namespaceCustomMarginBottom).toBeDefined();
            expect(namespaceCustomMarginLeft).toBeDefined();
        });

        it('should return an object with namespaced properties from expanded output map property', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    custom: {
                        margin: {
                            top: '1px',
                            right: '1px',
                            bottom: '1px',
                            left: '1px'
                        }
                    }
                },
                options
            );

            const {
                namespaceCustomMargin,
                namespaceCustomMarginTop,
                namespaceCustomMarginRight,
                namespaceCustomMarginBottom,
                namespaceCustomMarginLeft
            } = values;

            expect(namespaceCustomMargin).toBeDefined();
            expect(namespaceCustomMarginTop).toBeDefined();
            expect(namespaceCustomMarginRight).toBeDefined();
            expect(namespaceCustomMarginBottom).toBeDefined();
            expect(namespaceCustomMarginLeft).toBeDefined();
        });

        it('should return an nested object with deeply nested namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    custom: {
                        nested: {
                            first: '1px',
                            second: '2px'
                        }
                    }
                },
                options
            );

            const { namespaceCustomNestedFirst, namespaceCustomNestedSecond } = values;

            expect(namespaceCustomNestedFirst).toBeDefined();
            expect(namespaceCustomNestedSecond).toBeDefined();
        });

        it('should return an object from string value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    custom: {
                        nested: 'value'
                    }
                },
                options
            );

            expect(values).toEqual({
                namespaceCustomNested: nsvariable(ns, 'custom--nested', 'value', options)
            });
        });

        it('should return an nested object from object value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    custom: {
                        nested: {
                            first: '1px',
                            second: '2px'
                        }
                    }
                },
                options
            );

            expect(values).toEqual({
                namespaceCustomNestedFirst: nsvariable(ns, 'custom--nested--first', '1px', options),
                namespaceCustomNestedSecond: nsvariable(
                    ns,
                    'custom--nested--second',
                    '2px',
                    options
                )
            });
        });
    });
});

describe('variables', () => {
    it('should return an object with namespaced properties', () => {
        const values = variables(
            {
                custom: 'value'
            },
            options
        );

        const { custom } = values;

        expect(custom).toBeDefined();
    });

    it('should return an object from string value', () => {
        const values = variables(
            {
                custom: 'value'
            },
            options
        );

        expect(values).toEqual({
            custom: variable('custom', 'value', options)
        });
    });

    it('should return an object from object value', () => {
        const values = variables(
            {
                custom: {
                    fontSize: '16px'
                }
            },
            options
        );

        expect(values).toEqual({
            customFontSize: variable('custom--font-size', '16px', options)
        });
    });
});
