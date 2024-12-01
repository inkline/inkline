import { nsvariables } from './variables';
import { nsvariable } from './variable';
import { hsla } from './color';
import { ref } from './ref';

describe('nsvariables', () => {
    describe('animation', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                animation: 'slide 1s infinite normal'
            });

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
            const values = nsvariables(ns, {
                animation: 'slide 1s infinite normal'
            });

            expect(values).toEqual({
                namespaceAnimationName: nsvariable(ns, 'animation-name', 'slide'),
                namespaceAnimationDuration: nsvariable(ns, 'animation-duration', '1s'),
                namespaceAnimationIterationCount: nsvariable(
                    ns,
                    'animation-iteration-count',
                    'infinite'
                ),
                namespaceAnimationDirection: nsvariable(ns, 'animation-direction', 'normal'),
                namespaceAnimation: nsvariable(ns, 'animation', [
                    ref(values.namespaceAnimationName),
                    ref(values.namespaceAnimationDuration),
                    ref(values.namespaceAnimationIterationCount),
                    ref(values.namespaceAnimationDirection)
                ])
            });
        });

        it('should return an object from object value', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                animation: {
                    name: 'slide',
                    duration: '1s',
                    iterationCount: 'infinite',
                    direction: 'normal'
                }
            });

            expect(values).toEqual({
                namespaceAnimationName: nsvariable(ns, 'animation-name', 'slide'),
                namespaceAnimationDuration: nsvariable(ns, 'animation-duration', '1s'),
                namespaceAnimationIterationCount: nsvariable(
                    ns,
                    'animation-iteration-count',
                    'infinite'
                ),
                namespaceAnimationDirection: nsvariable(ns, 'animation-direction', 'normal'),
                namespaceAnimation: nsvariable(ns, 'animation', [
                    ref(nsvariable(ns, 'animation-name', '')),
                    ref(nsvariable(ns, 'animation-duration', '')),
                    ref(nsvariable(ns, 'animation-iteration-count', '')),
                    ref(nsvariable(ns, 'animation-direction', ''))
                ])
            });
        });
    });

    describe('border', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                border: '1px solid red'
            });

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
            const values = nsvariables(ns, {
                border: '1px solid red'
            });

            expect(values).toEqual({
                namespaceBorderTop: nsvariable(ns, 'border-top', [
                    ref(nsvariable(ns, 'border-top-width', '')),
                    ref(nsvariable(ns, 'border-top-style', '')),
                    ref(nsvariable(ns, 'border-top-color', ''))
                ]),
                namespaceBorderTopWidth: nsvariable(ns, 'border-top-width', '1px'),
                namespaceBorderTopStyle: nsvariable(ns, 'border-top-style', 'solid'),
                namespaceBorderTopColor: nsvariable(ns, 'border-top-color', 'red'),
                namespaceBorderRight: nsvariable(ns, 'border-right', [
                    ref(nsvariable(ns, 'border-right-width', '')),
                    ref(nsvariable(ns, 'border-right-style', '')),
                    ref(nsvariable(ns, 'border-right-color', ''))
                ]),
                namespaceBorderRightWidth: nsvariable(ns, 'border-right-width', '1px'),
                namespaceBorderRightStyle: nsvariable(ns, 'border-right-style', 'solid'),
                namespaceBorderRightColor: nsvariable(ns, 'border-right-color', 'red'),
                namespaceBorderBottom: nsvariable(ns, 'border-bottom', [
                    ref(nsvariable(ns, 'border-bottom-width', '')),
                    ref(nsvariable(ns, 'border-bottom-style', '')),
                    ref(nsvariable(ns, 'border-bottom-color', ''))
                ]),
                namespaceBorderBottomWidth: nsvariable(ns, 'border-bottom-width', '1px'),
                namespaceBorderBottomStyle: nsvariable(ns, 'border-bottom-style', 'solid'),
                namespaceBorderBottomColor: nsvariable(ns, 'border-bottom-color', 'red'),
                namespaceBorderLeft: nsvariable(ns, 'border-left', [
                    ref(nsvariable(ns, 'border-left-width', '')),
                    ref(nsvariable(ns, 'border-left-style', '')),
                    ref(nsvariable(ns, 'border-left-color', ''))
                ]),
                namespaceBorderLeftWidth: nsvariable(ns, 'border-left-width', '1px'),
                namespaceBorderLeftStyle: nsvariable(ns, 'border-left-style', 'solid'),
                namespaceBorderLeftColor: nsvariable(ns, 'border-left-color', 'red'),
                namespaceBorderWidth: nsvariable(
                    ns,
                    'border-width',
                    ref(nsvariable(ns, 'border-top-width', ''))
                ),
                namespaceBorderStyle: nsvariable(
                    ns,
                    'border-style',
                    ref(nsvariable(ns, 'border-top-style', ''))
                ),
                namespaceBorderColor: nsvariable(
                    ns,
                    'border-color',
                    ref(nsvariable(ns, 'border-top-color', ''))
                ),
                namespaceBorder: nsvariable(ns, 'border', [
                    ref(nsvariable(ns, 'border-top-width', '')),
                    ref(nsvariable(ns, 'border-top-style', '')),
                    ref(nsvariable(ns, 'border-top-color', ''))
                ])
            });
        });
    });

    describe('borderRadius', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                borderRadius: '1px'
            });

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
            const values = nsvariables(ns, {
                borderRadius: '1px'
            });

            expect(values).toEqual({
                namespaceBorderTopLeftRadius: nsvariable(ns, 'border-top-left-radius', '1px'),
                namespaceBorderTopRightRadius: nsvariable(ns, 'border-top-right-radius', '1px'),
                namespaceBorderBottomRightRadius: nsvariable(
                    ns,
                    'border-bottom-right-radius',
                    '1px'
                ),
                namespaceBorderBottomLeftRadius: nsvariable(ns, 'border-bottom-left-radius', '1px'),
                namespaceBorderRadius: nsvariable(ns, 'border-radius', [
                    ref(nsvariable(ns, 'border-top-left-radius', '')),
                    ref(nsvariable(ns, 'border-top-right-radius', '')),
                    ref(nsvariable(ns, 'border-bottom-right-radius', '')),
                    ref(nsvariable(ns, 'border-bottom-left-radius', ''))
                ])
            });
        });

        it('should return an object from 4-part string value', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                borderRadius: '1px 1px 1px 1px'
            });

            expect(values).toEqual({
                namespaceBorderTopLeftRadius: nsvariable(ns, 'border-top-left-radius', '1px'),
                namespaceBorderTopRightRadius: nsvariable(ns, 'border-top-right-radius', '1px'),
                namespaceBorderBottomRightRadius: nsvariable(
                    ns,
                    'border-bottom-right-radius',
                    '1px'
                ),
                namespaceBorderBottomLeftRadius: nsvariable(ns, 'border-bottom-left-radius', '1px'),
                namespaceBorderRadius: nsvariable(ns, 'border-radius', [
                    ref(nsvariable(ns, 'border-top-left-radius', '')),
                    ref(nsvariable(ns, 'border-top-right-radius', '')),
                    ref(nsvariable(ns, 'border-bottom-right-radius', '')),
                    ref(nsvariable(ns, 'border-bottom-left-radius', ''))
                ])
            });
        });

        it('should return an object from object value', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                borderRadius: {
                    topLeft: '1px',
                    topRight: '1px',
                    bottomRight: '1px',
                    bottomLeft: '1px'
                }
            });

            expect(values).toEqual({
                namespaceBorderTopLeftRadius: nsvariable(ns, 'border-top-left-radius', '1px'),
                namespaceBorderTopRightRadius: nsvariable(ns, 'border-top-right-radius', '1px'),
                namespaceBorderBottomRightRadius: nsvariable(
                    ns,
                    'border-bottom-right-radius',
                    '1px'
                ),
                namespaceBorderBottomLeftRadius: nsvariable(ns, 'border-bottom-left-radius', '1px'),
                namespaceBorderRadius: nsvariable(ns, 'border-radius', [
                    ref(nsvariable(ns, 'border-top-left-radius', '')),
                    ref(nsvariable(ns, 'border-top-right-radius', '')),
                    ref(nsvariable(ns, 'border-bottom-right-radius', '')),
                    ref(nsvariable(ns, 'border-bottom-left-radius', ''))
                ])
            });
        });
    });

    describe('boxShadow', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                boxShadow: '1px 1px 0px 0px red'
            });

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
            const values = nsvariables(ns, {
                boxShadow: '1px 1px 0px 0px red'
            });

            expect(values).toEqual({
                namespaceBoxShadowOffsetX: nsvariable(ns, 'box-shadow-offset-x', '1px'),
                namespaceBoxShadowOffsetY: nsvariable(ns, 'box-shadow-offset-y', '1px'),
                namespaceBoxShadowBlurRadius: nsvariable(ns, 'box-shadow-blur-radius', '0px'),
                namespaceBoxShadowSpreadRadius: nsvariable(ns, 'box-shadow-spread-radius', '0px'),
                namespaceBoxShadowColor: nsvariable(ns, 'box-shadow-color', 'red'),
                namespaceBoxShadow: nsvariable(ns, 'box-shadow', [
                    ref(values.namespaceBoxShadowOffsetX),
                    ref(values.namespaceBoxShadowOffsetY),
                    ref(values.namespaceBoxShadowBlurRadius),
                    ref(values.namespaceBoxShadowSpreadRadius),
                    ref(values.namespaceBoxShadowColor)
                ])
            });
        });

        it('should return an object from object value', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                boxShadow: {
                    offsetX: '1px',
                    offsetY: '1px',
                    blurRadius: '1px',
                    spreadRadius: '0px',
                    color: 'red'
                }
            });

            expect(values).toEqual({
                namespaceBoxShadowOffsetX: nsvariable(ns, 'box-shadow-offset-x', '1px'),
                namespaceBoxShadowOffsetY: nsvariable(ns, 'box-shadow-offset-y', '1px'),
                namespaceBoxShadowBlurRadius: nsvariable(ns, 'box-shadow-blur-radius', '1px'),
                namespaceBoxShadowSpreadRadius: nsvariable(ns, 'box-shadow-spread-radius', '0px'),
                namespaceBoxShadowColor: nsvariable(ns, 'box-shadow-color', 'red'),
                namespaceBoxShadow: nsvariable(ns, 'box-shadow', [
                    ref(nsvariable(ns, 'box-shadow-offset-x', '')),
                    ref(nsvariable(ns, 'box-shadow-offset-y', '')),
                    ref(nsvariable(ns, 'box-shadow-blur-radius', '')),
                    ref(nsvariable(ns, 'box-shadow-spread-radius', '')),
                    ref(nsvariable(ns, 'box-shadow-color', ''))
                ])
            });
        });
    });

    describe('background', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                background: 'red'
            });

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
            const values = nsvariables(ns, {
                background: 'red'
            });

            expect(values).toEqual({
                namespaceBackgroundH: nsvariable(ns, 'background-h', 0),
                namespaceBackgroundS: nsvariable(ns, 'background-s', '100%'),
                namespaceBackgroundL: nsvariable(ns, 'background-l', '50%'),
                namespaceBackgroundA: nsvariable(ns, 'background-a', 1),
                namespaceBackground: nsvariable(
                    ns,
                    'background',
                    hsla([
                        ref(nsvariable(ns, 'background-h', '')),
                        ref(nsvariable(ns, 'background-s', '')),
                        ref(nsvariable(ns, 'background-l', '')),
                        ref(nsvariable(ns, 'background-a', ''))
                    ])
                )
            });
        });

        it('should return an object from object value', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                background: {
                    h: 0,
                    s: '100%',
                    l: '50%',
                    a: 1
                }
            });

            expect(values).toEqual({
                namespaceBackgroundH: nsvariable(ns, 'background-h', 0),
                namespaceBackgroundS: nsvariable(ns, 'background-s', '100%'),
                namespaceBackgroundL: nsvariable(ns, 'background-l', '50%'),
                namespaceBackgroundA: nsvariable(ns, 'background-a', 1),
                namespaceBackground: nsvariable(
                    ns,
                    'background',
                    hsla([
                        ref(nsvariable(ns, 'background-h', '')),
                        ref(nsvariable(ns, 'background-s', '')),
                        ref(nsvariable(ns, 'background-l', '')),
                        ref(nsvariable(ns, 'background-a', ''))
                    ])
                )
            });
        });
    });

    describe('color', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                color: 'red'
            });

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
            const values = nsvariables(ns, {
                color: 'red'
            });

            expect(values).toEqual({
                namespaceColorH: nsvariable(ns, 'color-h', 0),
                namespaceColorS: nsvariable(ns, 'color-s', '100%'),
                namespaceColorL: nsvariable(ns, 'color-l', '50%'),
                namespaceColorA: nsvariable(ns, 'color-a', 1),
                namespaceColor: nsvariable(
                    ns,
                    'color',
                    hsla([
                        ref(nsvariable(ns, 'color-h', '')),
                        ref(nsvariable(ns, 'color-s', '')),
                        ref(nsvariable(ns, 'color-l', '')),
                        ref(nsvariable(ns, 'color-a', ''))
                    ])
                )
            });
        });

        it('should return an object from object value', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                color: {
                    h: 0,
                    s: '100%',
                    l: '50%',
                    a: 1
                }
            });

            expect(values).toEqual({
                namespaceColorH: nsvariable(ns, 'color-h', 0),
                namespaceColorS: nsvariable(ns, 'color-s', '100%'),
                namespaceColorL: nsvariable(ns, 'color-l', '50%'),
                namespaceColorA: nsvariable(ns, 'color-a', 1),
                namespaceColor: nsvariable(
                    ns,
                    'color',
                    hsla([
                        ref(nsvariable(ns, 'color-h', '')),
                        ref(nsvariable(ns, 'color-s', '')),
                        ref(nsvariable(ns, 'color-l', '')),
                        ref(nsvariable(ns, 'color-a', ''))
                    ])
                )
            });
        });
    });

    describe('margin', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                margin: '1px'
            });

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
            const values = nsvariables(ns, {
                margin: '1px'
            });

            expect(values).toEqual({
                namespaceMarginTop: nsvariable(ns, 'margin-top', '1px'),
                namespaceMarginRight: nsvariable(ns, 'margin-right', '1px'),
                namespaceMarginBottom: nsvariable(ns, 'margin-bottom', '1px'),
                namespaceMarginLeft: nsvariable(ns, 'margin-left', '1px'),
                namespaceMargin: nsvariable(ns, 'margin', [
                    ref(values.namespaceMarginTop),
                    ref(values.namespaceMarginRight),
                    ref(values.namespaceMarginBottom),
                    ref(values.namespaceMarginLeft)
                ])
            });
        });

        it('should return an object from object value', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                margin: {
                    top: '1px',
                    right: '1px',
                    bottom: '1px',
                    left: '1px'
                }
            });

            expect(values).toEqual({
                namespaceMarginTop: nsvariable(ns, 'margin-top', '1px'),
                namespaceMarginRight: nsvariable(ns, 'margin-right', '1px'),
                namespaceMarginBottom: nsvariable(ns, 'margin-bottom', '1px'),
                namespaceMarginLeft: nsvariable(ns, 'margin-left', '1px'),
                namespaceMargin: nsvariable(ns, 'margin', [
                    ref(nsvariable(ns, 'margin-top', '')),
                    ref(nsvariable(ns, 'margin-right', '')),
                    ref(nsvariable(ns, 'margin-bottom', '')),
                    ref(nsvariable(ns, 'margin-left', ''))
                ])
            });
        });
    });

    describe('padding', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                padding: '1px'
            });

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
            const values = nsvariables(ns, {
                padding: '1px'
            });

            expect(values).toEqual({
                namespacePaddingTop: nsvariable(ns, 'padding-top', '1px'),
                namespacePaddingRight: nsvariable(ns, 'padding-right', '1px'),
                namespacePaddingBottom: nsvariable(ns, 'padding-bottom', '1px'),
                namespacePaddingLeft: nsvariable(ns, 'padding-left', '1px'),
                namespacePadding: nsvariable(ns, 'padding', [
                    ref(values.namespacePaddingTop),
                    ref(values.namespacePaddingRight),
                    ref(values.namespacePaddingBottom),
                    ref(values.namespacePaddingLeft)
                ])
            });
        });

        it('should return an object from object value', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                padding: {
                    top: '1px',
                    right: '1px',
                    bottom: '1px',
                    left: '1px'
                }
            });

            expect(values).toEqual({
                namespacePaddingTop: nsvariable(ns, 'padding-top', '1px'),
                namespacePaddingRight: nsvariable(ns, 'padding-right', '1px'),
                namespacePaddingBottom: nsvariable(ns, 'padding-bottom', '1px'),
                namespacePaddingLeft: nsvariable(ns, 'padding-left', '1px'),
                namespacePadding: nsvariable(ns, 'padding', [
                    ref(nsvariable(ns, 'padding-top', '')),
                    ref(nsvariable(ns, 'padding-right', '')),
                    ref(nsvariable(ns, 'padding-bottom', '')),
                    ref(nsvariable(ns, 'padding-left', ''))
                ])
            });
        });
    });

    describe('transition', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                transition: 'color 1s ease-in-out'
            });

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
            const values = nsvariables(ns, {
                transition: 'color 1s ease-in-out'
            });

            expect(values).toEqual({
                namespaceTransitionProperty: nsvariable(ns, 'transition-property', 'color'),
                namespaceTransitionDuration: nsvariable(ns, 'transition-duration', '1s'),
                namespaceTransitionTimingFunction: nsvariable(
                    ns,
                    'transition-timing-function',
                    'ease-in-out'
                ),
                namespaceTransition: nsvariable(ns, 'transition', [
                    ref(values.namespaceTransitionProperty),
                    ref(values.namespaceTransitionDuration),
                    ref(values.namespaceTransitionTimingFunction)
                ])
            });
        });

        it('should return an object from object value', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                transition: {
                    property: 'color',
                    duration: '1s',
                    timingFunction: 'ease-in-out'
                }
            });

            expect(values).toEqual({
                namespaceTransitionProperty: nsvariable(ns, 'transition-property', 'color'),
                namespaceTransitionDuration: nsvariable(ns, 'transition-duration', '1s'),
                namespaceTransitionTimingFunction: nsvariable(
                    ns,
                    'transition-timing-function',
                    'ease-in-out'
                ),
                namespaceTransition: nsvariable(ns, 'transition', [
                    ref(nsvariable(ns, 'transition-property', '')),
                    ref(nsvariable(ns, 'transition-duration', '')),
                    ref(nsvariable(ns, 'transition-timing-function', ''))
                ])
            });
        });
    });

    describe('generic', () => {
        it('should return an object with namespaced properties', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                custom: 'value'
            });

            const { namespaceCustom } = values;

            expect(namespaceCustom).toBeDefined();
        });

        it('should return an object from string value', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                custom: 'value'
            });

            expect(values).toEqual({
                namespaceCustom: nsvariable(ns, 'custom', 'value')
            });
        });

        it('should return an object from object value', () => {
            const ns = 'namespace';
            const values = nsvariables(ns, {
                custom: 'value'
            });

            expect(values).toEqual({
                namespaceCustom: nsvariable(ns, 'custom', 'value')
            });
        });
    });

    // describe('nesting', () => {
    //     it('should return an object with namespaced properties', () => {
    //         const ns = 'namespace';
    //         const values = nsvariables(ns, {
    //             custom: nsvariables([ns, 'custom'] as const, {
    //                 nested: 'value'
    //             })
    //         });
    //
    //         const { namespaceCustom };
    //
    //         const { namespaceCustomNested } = values;
    //
    //         expect(namespaceCustomNested).toBeDefined();
    //     });
    // });
});
