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
                namespaceAnimation
            } = values;

            expect(namespaceAnimationName).toBeDefined();
            expect(namespaceAnimationDuration).toBeDefined();
            expect(namespaceAnimationIterationCount).toBeDefined();
            expect(namespaceAnimationDirection).toBeDefined();
            expect(namespaceAnimation).toBeDefined();
        });

        it('should return an object from string value', () => {
            const ns = 'namespace';
            const values = nsvariables(
                ns,
                {
                    animation: 'slide 1s infinite normal'
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
                namespaceBorderTopColorH: nsvariable(ns, 'border-top-color-h', 0, options),
                namespaceBorderTopColorS: nsvariable(ns, 'border-top-color-s', '100%', options),
                namespaceBorderTopColorL: nsvariable(ns, 'border-top-color-l', '50%', options),
                namespaceBorderTopColorA: nsvariable(ns, 'border-top-color-a', 1, options),
                namespaceBorderTopColor: nsvariable(
                    ns,
                    'border-top-color',
                    hsla([
                        ref(nsvariable(ns, 'border-top-color-h', '', options)),
                        ref(nsvariable(ns, 'border-top-color-s', '', options)),
                        ref(nsvariable(ns, 'border-top-color-l', '', options)),
                        ref(nsvariable(ns, 'border-top-color-a', '', options))
                    ]),
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
                namespaceBorderRightColorH: nsvariable(ns, 'border-right-color-h', 0, options),
                namespaceBorderRightColorS: nsvariable(ns, 'border-right-color-s', '100%', options),
                namespaceBorderRightColorL: nsvariable(ns, 'border-right-color-l', '50%', options),
                namespaceBorderRightColorA: nsvariable(ns, 'border-right-color-a', 1, options),
                namespaceBorderRightColor: nsvariable(
                    ns,
                    'border-right-color',
                    hsla([
                        ref(nsvariable(ns, 'border-right-color-h', '', options)),
                        ref(nsvariable(ns, 'border-right-color-s', '', options)),
                        ref(nsvariable(ns, 'border-right-color-l', '', options)),
                        ref(nsvariable(ns, 'border-right-color-a', '', options))
                    ]),
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
                namespaceBorderBottomColorH: nsvariable(ns, 'border-bottom-color-h', 0, options),
                namespaceBorderBottomColorS: nsvariable(
                    ns,
                    'border-bottom-color-s',
                    '100%',
                    options
                ),
                namespaceBorderBottomColorL: nsvariable(
                    ns,
                    'border-bottom-color-l',
                    '50%',
                    options
                ),
                namespaceBorderBottomColorA: nsvariable(ns, 'border-bottom-color-a', 1, options),
                namespaceBorderBottomColor: nsvariable(
                    ns,
                    'border-bottom-color',
                    hsla([
                        ref(nsvariable(ns, 'border-bottom-color-h', '', options)),
                        ref(nsvariable(ns, 'border-bottom-color-s', '', options)),
                        ref(nsvariable(ns, 'border-bottom-color-l', '', options)),
                        ref(nsvariable(ns, 'border-bottom-color-a', '', options))
                    ]),
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
                namespaceBorderLeftColorH: nsvariable(ns, 'border-left-color-h', 0, options),
                namespaceBorderLeftColorS: nsvariable(ns, 'border-left-color-s', '100%', options),
                namespaceBorderLeftColorL: nsvariable(ns, 'border-left-color-l', '50%', options),
                namespaceBorderLeftColorA: nsvariable(ns, 'border-left-color-a', 1, options),
                namespaceBorderLeftColor: nsvariable(
                    ns,
                    'border-left-color',
                    hsla([
                        ref(nsvariable(ns, 'border-left-color-h', '', options)),
                        ref(nsvariable(ns, 'border-left-color-s', '', options)),
                        ref(nsvariable(ns, 'border-left-color-l', '', options)),
                        ref(nsvariable(ns, 'border-left-color-a', '', options))
                    ]),
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

            const {
                namespaceBackgroundH,
                namespaceBackgroundS,
                namespaceBackgroundL,
                namespaceBackgroundA,
                namespaceBackground
            } = values;

            expect(namespaceBackgroundH).toBeDefined();
            expect(namespaceBackgroundS).toBeDefined();
            expect(namespaceBackgroundL).toBeDefined();
            expect(namespaceBackgroundA).toBeDefined();
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
                namespaceBackgroundH: nsvariable(ns, 'background-h', 0, options),
                namespaceBackgroundS: nsvariable(ns, 'background-s', '100%', options),
                namespaceBackgroundL: nsvariable(ns, 'background-l', '50%', options),
                namespaceBackgroundA: nsvariable(ns, 'background-a', 1, options),
                namespaceBackground: nsvariable(
                    ns,
                    'background',
                    hsla([
                        ref(nsvariable(ns, 'background-h', '', options)),
                        ref(nsvariable(ns, 'background-s', '', options)),
                        ref(nsvariable(ns, 'background-l', '', options)),
                        ref(nsvariable(ns, 'background-a', '', options))
                    ]),
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
                namespaceBackgroundH: nsvariable(ns, 'background-h', 0, options),
                namespaceBackgroundS: nsvariable(ns, 'background-s', '100%', options),
                namespaceBackgroundL: nsvariable(ns, 'background-l', '50%', options),
                namespaceBackgroundA: nsvariable(ns, 'background-a', 1, options),
                namespaceBackground: nsvariable(
                    ns,
                    'background',
                    hsla([
                        ref(nsvariable(ns, 'background-h', '', options)),
                        ref(nsvariable(ns, 'background-s', '', options)),
                        ref(nsvariable(ns, 'background-l', '', options)),
                        ref(nsvariable(ns, 'background-a', '', options))
                    ]),
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

            const {
                namespaceColorH,
                namespaceColorS,
                namespaceColorL,
                namespaceColorA,
                namespaceColor
            } = values;

            expect(namespaceColorH).toBeDefined();
            expect(namespaceColorS).toBeDefined();
            expect(namespaceColorL).toBeDefined();
            expect(namespaceColorA).toBeDefined();
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
                namespaceColorH: nsvariable(ns, 'color-h', 0, options),
                namespaceColorS: nsvariable(ns, 'color-s', '100%', options),
                namespaceColorL: nsvariable(ns, 'color-l', '50%', options),
                namespaceColorA: nsvariable(ns, 'color-a', 1, options),
                namespaceColor: nsvariable(
                    ns,
                    'color',
                    hsla([
                        ref(nsvariable(ns, 'color-h', '', options)),
                        ref(nsvariable(ns, 'color-s', '', options)),
                        ref(nsvariable(ns, 'color-l', '', options)),
                        ref(nsvariable(ns, 'color-a', '', options))
                    ]),
                    options
                )
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
                namespaceColorH: nsvariable(ns, 'color-h', 0, options),
                namespaceColorS: nsvariable(ns, 'color-s', '100%', options),
                namespaceColorL: nsvariable(ns, 'color-l', '50%', options),
                namespaceColorA: nsvariable(ns, 'color-a', 1, options),
                namespaceColor: nsvariable(
                    ns,
                    'color',
                    hsla([
                        ref(nsvariable(ns, 'color-h', '', options)),
                        ref(nsvariable(ns, 'color-s', '', options)),
                        ref(nsvariable(ns, 'color-l', '', options)),
                        ref(nsvariable(ns, 'color-a', '', options))
                    ]),
                    options
                )
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
                custom: 'value'
            },
            options
        );

        expect(values).toEqual({
            custom: variable('custom', 'value', options)
        });
    });
});
