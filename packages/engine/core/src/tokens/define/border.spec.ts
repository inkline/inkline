import { defineBorder } from './border';
import { nsvariable } from '../variable';
import { ref } from '../ref';
import { hsla } from '../color';

describe('defineBorder', () => {
    it('should create default border variables when no value is provided', () => {
        const result = defineBorder('namespace', '');
        const colorHDefault = 'from currentColor h';
        const colorSDefault = 'from currentColor s';
        const colorLDefault = 'from currentColor l';
        const colorADefault = 'from currentColor a';

        expect(result).toEqual({
            namespaceBorderTopWidth: nsvariable('namespace', 'border-top-width', 0),
            namespaceBorderTopStyle: nsvariable('namespace', 'border-top-style', 'none'),
            namespaceBorderTopColorH: nsvariable('namespace', 'border-top-color-h', colorHDefault),
            namespaceBorderTopColorS: nsvariable('namespace', 'border-top-color-s', colorSDefault),
            namespaceBorderTopColorL: nsvariable('namespace', 'border-top-color-l', colorLDefault),
            namespaceBorderTopColorA: nsvariable('namespace', 'border-top-color-a', colorADefault),
            namespaceBorderTopColor: nsvariable(
                'namespace',
                'border-top-color',
                hsla([
                    ref(nsvariable('namespace', 'border-top-color-h', colorHDefault)),
                    ref(nsvariable('namespace', 'border-top-color-s', colorSDefault)),
                    ref(nsvariable('namespace', 'border-top-color-l', colorLDefault)),
                    ref(nsvariable('namespace', 'border-top-color-a', colorADefault))
                ])
            ),
            namespaceBorderRightWidth: nsvariable('namespace', 'border-right-width', 0),
            namespaceBorderRightStyle: nsvariable('namespace', 'border-right-style', 'none'),
            namespaceBorderRightColorH: nsvariable(
                'namespace',
                'border-right-color-h',
                colorHDefault
            ),
            namespaceBorderRightColorS: nsvariable(
                'namespace',
                'border-right-color-s',
                colorSDefault
            ),
            namespaceBorderRightColorL: nsvariable(
                'namespace',
                'border-right-color-l',
                colorLDefault
            ),
            namespaceBorderRightColorA: nsvariable(
                'namespace',
                'border-right-color-a',
                colorADefault
            ),
            namespaceBorderRightColor: nsvariable(
                'namespace',
                'border-right-color',
                hsla([
                    ref(nsvariable('namespace', 'border-right-color-h', colorHDefault)),
                    ref(nsvariable('namespace', 'border-right-color-s', colorSDefault)),
                    ref(nsvariable('namespace', 'border-right-color-l', colorLDefault)),
                    ref(nsvariable('namespace', 'border-right-color-a', colorADefault))
                ])
            ),
            namespaceBorderBottomWidth: nsvariable('namespace', 'border-bottom-width', 0),
            namespaceBorderBottomStyle: nsvariable('namespace', 'border-bottom-style', 'none'),
            namespaceBorderBottomColorH: nsvariable(
                'namespace',
                'border-bottom-color-h',
                colorHDefault
            ),
            namespaceBorderBottomColorS: nsvariable(
                'namespace',
                'border-bottom-color-s',
                colorSDefault
            ),
            namespaceBorderBottomColorL: nsvariable(
                'namespace',
                'border-bottom-color-l',
                colorLDefault
            ),
            namespaceBorderBottomColorA: nsvariable(
                'namespace',
                'border-bottom-color-a',
                colorADefault
            ),
            namespaceBorderBottomColor: nsvariable(
                'namespace',
                'border-bottom-color',
                hsla([
                    ref(nsvariable('namespace', 'border-bottom-color-h', colorHDefault)),
                    ref(nsvariable('namespace', 'border-bottom-color-s', colorSDefault)),
                    ref(nsvariable('namespace', 'border-bottom-color-l', colorLDefault)),
                    ref(nsvariable('namespace', 'border-bottom-color-a', colorADefault))
                ])
            ),
            namespaceBorderLeftWidth: nsvariable('namespace', 'border-left-width', 0),
            namespaceBorderLeftStyle: nsvariable('namespace', 'border-left-style', 'none'),
            namespaceBorderLeftColorH: nsvariable(
                'namespace',
                'border-left-color-h',
                colorHDefault
            ),
            namespaceBorderLeftColorS: nsvariable(
                'namespace',
                'border-left-color-s',
                colorSDefault
            ),
            namespaceBorderLeftColorL: nsvariable(
                'namespace',
                'border-left-color-l',
                colorLDefault
            ),
            namespaceBorderLeftColorA: nsvariable(
                'namespace',
                'border-left-color-a',
                colorADefault
            ),
            namespaceBorderLeftColor: nsvariable(
                'namespace',
                'border-left-color',
                hsla([
                    ref(nsvariable('namespace', 'border-left-color-h', colorHDefault)),
                    ref(nsvariable('namespace', 'border-left-color-s', colorSDefault)),
                    ref(nsvariable('namespace', 'border-left-color-l', colorLDefault)),
                    ref(nsvariable('namespace', 'border-left-color-a', colorADefault))
                ])
            ),
            namespaceBorderColor: nsvariable('namespace', 'border-color', [
                ref(
                    nsvariable(
                        'namespace',
                        'border-top-color',
                        hsla([
                            ref(nsvariable('namespace', 'border-top-color-h', colorHDefault)),
                            ref(nsvariable('namespace', 'border-top-color-s', colorSDefault)),
                            ref(nsvariable('namespace', 'border-top-color-l', colorLDefault)),
                            ref(nsvariable('namespace', 'border-top-color-a', colorADefault))
                        ])
                    )
                ),
                ref(
                    nsvariable(
                        'namespace',
                        'border-right-color',
                        hsla([
                            ref(nsvariable('namespace', 'border-right-color-h', colorHDefault)),
                            ref(nsvariable('namespace', 'border-right-color-s', colorSDefault)),
                            ref(nsvariable('namespace', 'border-right-color-l', colorLDefault)),
                            ref(nsvariable('namespace', 'border-right-color-a', colorADefault))
                        ])
                    )
                ),
                ref(
                    nsvariable(
                        'namespace',
                        'border-bottom-color',
                        hsla([
                            ref(nsvariable('namespace', 'border-bottom-color-h', colorHDefault)),
                            ref(nsvariable('namespace', 'border-bottom-color-s', colorSDefault)),
                            ref(nsvariable('namespace', 'border-bottom-color-l', colorLDefault)),
                            ref(nsvariable('namespace', 'border-bottom-color-a', colorADefault))
                        ])
                    )
                ),
                ref(
                    nsvariable(
                        'namespace',
                        'border-left-color',
                        hsla([
                            ref(nsvariable('namespace', 'border-left-color-h', colorHDefault)),
                            ref(nsvariable('namespace', 'border-left-color-s', colorSDefault)),
                            ref(nsvariable('namespace', 'border-left-color-l', colorLDefault)),
                            ref(nsvariable('namespace', 'border-left-color-a', colorADefault))
                        ])
                    )
                )
            ]),
            namespaceBorderStyle: nsvariable('namespace', 'border-style', [
                ref(nsvariable('namespace', 'border-top-style', 'none')),
                ref(nsvariable('namespace', 'border-right-style', 'none')),
                ref(nsvariable('namespace', 'border-bottom-style', 'none')),
                ref(nsvariable('namespace', 'border-left-style', 'none'))
            ]),
            namespaceBorderWidth: nsvariable('namespace', 'border-width', [
                ref(nsvariable('namespace', 'border-top-width', 0)),
                ref(nsvariable('namespace', 'border-right-width', 0)),
                ref(nsvariable('namespace', 'border-bottom-width', 0)),
                ref(nsvariable('namespace', 'border-left-width', 0))
            ]),
            namespaceBorderTop: nsvariable('namespace', 'border-top', [
                ref(nsvariable('namespace', 'border-top-width', 0)),
                ref(nsvariable('namespace', 'border-top-style', 'none')),
                ref(
                    nsvariable(
                        'namespace',
                        'border-top-color',
                        hsla([
                            ref(nsvariable('namespace', 'border-top-color-h', colorHDefault)),
                            ref(nsvariable('namespace', 'border-top-color-s', colorSDefault)),
                            ref(nsvariable('namespace', 'border-top-color-l', colorLDefault)),
                            ref(nsvariable('namespace', 'border-top-color-a', colorADefault))
                        ])
                    )
                )
            ]),
            namespaceBorderRight: nsvariable('namespace', 'border-right', [
                ref(nsvariable('namespace', 'border-right-width', 0)),
                ref(nsvariable('namespace', 'border-right-style', 'none')),
                ref(
                    nsvariable(
                        'namespace',
                        'border-right-color',
                        hsla([
                            ref(nsvariable('namespace', 'border-right-color-h', colorHDefault)),
                            ref(nsvariable('namespace', 'border-right-color-s', colorSDefault)),
                            ref(nsvariable('namespace', 'border-right-color-l', colorLDefault)),
                            ref(nsvariable('namespace', 'border-right-color-a', colorADefault))
                        ])
                    )
                )
            ]),
            namespaceBorderBottom: nsvariable('namespace', 'border-bottom', [
                ref(nsvariable('namespace', 'border-bottom-width', 0)),
                ref(nsvariable('namespace', 'border-bottom-style', 'none')),
                ref(
                    nsvariable(
                        'namespace',
                        'border-bottom-color',
                        hsla([
                            ref(nsvariable('namespace', 'border-bottom-color-h', colorHDefault)),
                            ref(nsvariable('namespace', 'border-bottom-color-s', colorSDefault)),
                            ref(nsvariable('namespace', 'border-bottom-color-l', colorLDefault)),
                            ref(nsvariable('namespace', 'border-bottom-color-a', colorADefault))
                        ])
                    )
                )
            ]),
            namespaceBorderLeft: nsvariable('namespace', 'border-left', [
                ref(nsvariable('namespace', 'border-left-width', 0)),
                ref(nsvariable('namespace', 'border-left-style', 'none')),
                ref(
                    nsvariable(
                        'namespace',
                        'border-left-color',
                        hsla([
                            ref(nsvariable('namespace', 'border-left-color-h', colorHDefault)),
                            ref(nsvariable('namespace', 'border-left-color-s', colorSDefault)),
                            ref(nsvariable('namespace', 'border-left-color-l', colorLDefault)),
                            ref(nsvariable('namespace', 'border-left-color-a', colorADefault))
                        ])
                    )
                )
            ]),
            namespaceBorder: nsvariable('namespace', 'border', [
                ref(nsvariable('namespace', 'border-top-width', 0)),
                ref(nsvariable('namespace', 'border-top-style', 'none')),
                ref(
                    nsvariable(
                        'namespace',
                        'border-top-color',
                        hsla([
                            ref(nsvariable('namespace', 'border-top-color-h', colorHDefault)),
                            ref(nsvariable('namespace', 'border-top-color-s', colorSDefault)),
                            ref(nsvariable('namespace', 'border-top-color-l', colorLDefault)),
                            ref(nsvariable('namespace', 'border-top-color-a', colorADefault))
                        ])
                    )
                )
            ])
        });
    });

    it('should return object with namespaced properties', () => {
        const result = defineBorder('namespace', '1px solid black');

        const {
            namespaceBorderTopWidth,
            namespaceBorderTopStyle,
            namespaceBorderTopColor,
            namespaceBorderTopColorH,
            namespaceBorderTopColorS,
            namespaceBorderTopColorL,
            namespaceBorderTopColorA,
            namespaceBorderRightColor,
            namespaceBorderRightColorH,
            namespaceBorderRightColorS,
            namespaceBorderRightColorL,
            namespaceBorderRightColorA,
            namespaceBorderBottomColor,
            namespaceBorderBottomColorH,
            namespaceBorderBottomColorS,
            namespaceBorderBottomColorL,
            namespaceBorderBottomColorA,
            namespaceBorderLeftColor,
            namespaceBorderLeftColorH,
            namespaceBorderLeftColorS,
            namespaceBorderLeftColorL,
            namespaceBorderLeftColorA,
            namespaceBorderWidth,
            namespaceBorderStyle,
            namespaceBorderColor,
            namespaceBorderTop,
            namespaceBorderRight,
            namespaceBorderBottom,
            namespaceBorderLeft,
            namespaceBorder
        } = result;

        expect(namespaceBorderTopWidth).toBeDefined();
        expect(namespaceBorderTopStyle).toBeDefined();
        expect(namespaceBorderTopColor).toBeDefined();
        expect(namespaceBorderTopColorH).toBeDefined();
        expect(namespaceBorderTopColorS).toBeDefined();
        expect(namespaceBorderTopColorL).toBeDefined();
        expect(namespaceBorderTopColorA).toBeDefined();
        expect(namespaceBorderRightColor).toBeDefined();
        expect(namespaceBorderRightColorH).toBeDefined();
        expect(namespaceBorderRightColorS).toBeDefined();
        expect(namespaceBorderRightColorL).toBeDefined();
        expect(namespaceBorderRightColorA).toBeDefined();
        expect(namespaceBorderBottomColor).toBeDefined();
        expect(namespaceBorderBottomColorH).toBeDefined();
        expect(namespaceBorderBottomColorS).toBeDefined();
        expect(namespaceBorderBottomColorL).toBeDefined();
        expect(namespaceBorderBottomColorA).toBeDefined();
        expect(namespaceBorderLeftColor).toBeDefined();
        expect(namespaceBorderLeftColorH).toBeDefined();
        expect(namespaceBorderLeftColorS).toBeDefined();
        expect(namespaceBorderLeftColorL).toBeDefined();
        expect(namespaceBorderLeftColorA).toBeDefined();
        expect(namespaceBorderWidth).toBeDefined();
        expect(namespaceBorderStyle).toBeDefined();
        expect(namespaceBorderColor).toBeDefined();
        expect(namespaceBorderTop).toBeDefined();
        expect(namespaceBorderRight).toBeDefined();
        expect(namespaceBorderBottom).toBeDefined();
        expect(namespaceBorderLeft).toBeDefined();
        expect(namespaceBorder).toBeDefined();
    });

    it('should return object with non-namespaced properties', () => {
        const result = defineBorder('', '1px solid black');

        const {
            borderTopWidth,
            borderTopStyle,
            borderTopColor,
            borderTopColorH,
            borderTopColorS,
            borderTopColorL,
            borderTopColorA,
            borderRightColor,
            borderRightColorH,
            borderRightColorS,
            borderRightColorL,
            borderRightColorA,
            borderBottomColor,
            borderBottomColorH,
            borderBottomColorS,
            borderBottomColorL,
            borderBottomColorA,
            borderLeftColor,
            borderLeftColorH,
            borderLeftColorS,
            borderLeftColorL,
            borderLeftColorA,
            borderWidth,
            borderStyle,
            borderColor,
            borderTop,
            borderRight,
            borderBottom,
            borderLeft,
            border
        } = result;

        expect(borderTopWidth).toBeDefined();
        expect(borderTopStyle).toBeDefined();
        expect(borderTopColor).toBeDefined();
        expect(borderTopColorH).toBeDefined();
        expect(borderTopColorS).toBeDefined();
        expect(borderTopColorL).toBeDefined();
        expect(borderTopColorA).toBeDefined();
        expect(borderRightColor).toBeDefined();
        expect(borderRightColorH).toBeDefined();
        expect(borderRightColorS).toBeDefined();
        expect(borderRightColorL).toBeDefined();
        expect(borderRightColorA).toBeDefined();
        expect(borderBottomColor).toBeDefined();
        expect(borderBottomColorH).toBeDefined();
        expect(borderBottomColorS).toBeDefined();
        expect(borderBottomColorL).toBeDefined();
        expect(borderBottomColorA).toBeDefined();
        expect(borderLeftColor).toBeDefined();
        expect(borderLeftColorH).toBeDefined();
        expect(borderLeftColorS).toBeDefined();
        expect(borderLeftColorL).toBeDefined();
        expect(borderLeftColorA).toBeDefined();
        expect(borderWidth).toBeDefined();
        expect(borderStyle).toBeDefined();
        expect(borderColor).toBeDefined();
        expect(borderTop).toBeDefined();
        expect(borderRight).toBeDefined();
        expect(borderBottom).toBeDefined();
        expect(borderLeft).toBeDefined();
        expect(border).toBeDefined();
    });
});
