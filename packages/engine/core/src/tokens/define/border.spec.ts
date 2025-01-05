import { defineBorder } from './border';
import { nsvariable } from '../variable';
import { ref } from '../ref';
import { hsla } from '../color';
import { createContext } from '../../context';

const options = { context: createContext() };

describe('defineBorder', () => {
    it('should create default border variables when no value is provided', () => {
        const result = defineBorder('namespace', '', options);
        const colorHDefault = 'from currentColor h';
        const colorSDefault = 'from currentColor s';
        const colorLDefault = 'from currentColor l';
        const colorADefault = 'from currentColor a';

        expect(result).toEqual({
            namespaceBorderTopWidth: nsvariable('namespace', 'border-top-width', 0, options),
            namespaceBorderTopStyle: nsvariable('namespace', 'border-top-style', 'none', options),
            namespaceBorderTopColorH: nsvariable(
                'namespace',
                'border-top-color-h',
                colorHDefault,
                options
            ),
            namespaceBorderTopColorS: nsvariable(
                'namespace',
                'border-top-color-s',
                colorSDefault,
                options
            ),
            namespaceBorderTopColorL: nsvariable(
                'namespace',
                'border-top-color-l',
                colorLDefault,
                options
            ),
            namespaceBorderTopColorA: nsvariable(
                'namespace',
                'border-top-color-a',
                colorADefault,
                options
            ),
            namespaceBorderTopColor: nsvariable(
                'namespace',
                'border-top-color',
                hsla([
                    ref(nsvariable('namespace', 'border-top-color-h', colorHDefault, options)),
                    ref(nsvariable('namespace', 'border-top-color-s', colorSDefault, options)),
                    ref(nsvariable('namespace', 'border-top-color-l', colorLDefault, options)),
                    ref(nsvariable('namespace', 'border-top-color-a', colorADefault, options))
                ]),
                options
            ),
            namespaceBorderRightWidth: nsvariable('namespace', 'border-right-width', 0, options),
            namespaceBorderRightStyle: nsvariable(
                'namespace',
                'border-right-style',
                'none',
                options
            ),
            namespaceBorderRightColorH: nsvariable(
                'namespace',
                'border-right-color-h',
                colorHDefault,
                options
            ),
            namespaceBorderRightColorS: nsvariable(
                'namespace',
                'border-right-color-s',
                colorSDefault,
                options
            ),
            namespaceBorderRightColorL: nsvariable(
                'namespace',
                'border-right-color-l',
                colorLDefault,
                options
            ),
            namespaceBorderRightColorA: nsvariable(
                'namespace',
                'border-right-color-a',
                colorADefault,
                options
            ),
            namespaceBorderRightColor: nsvariable(
                'namespace',
                'border-right-color',
                hsla([
                    ref(nsvariable('namespace', 'border-right-color-h', colorHDefault, options)),
                    ref(nsvariable('namespace', 'border-right-color-s', colorSDefault, options)),
                    ref(nsvariable('namespace', 'border-right-color-l', colorLDefault, options)),
                    ref(nsvariable('namespace', 'border-right-color-a', colorADefault, options))
                ]),
                options
            ),
            namespaceBorderBottomWidth: nsvariable('namespace', 'border-bottom-width', 0, options),
            namespaceBorderBottomStyle: nsvariable(
                'namespace',
                'border-bottom-style',
                'none',
                options
            ),
            namespaceBorderBottomColorH: nsvariable(
                'namespace',
                'border-bottom-color-h',
                colorHDefault,
                options
            ),
            namespaceBorderBottomColorS: nsvariable(
                'namespace',
                'border-bottom-color-s',
                colorSDefault,
                options
            ),
            namespaceBorderBottomColorL: nsvariable(
                'namespace',
                'border-bottom-color-l',
                colorLDefault,
                options
            ),
            namespaceBorderBottomColorA: nsvariable(
                'namespace',
                'border-bottom-color-a',
                colorADefault,
                options
            ),
            namespaceBorderBottomColor: nsvariable(
                'namespace',
                'border-bottom-color',
                hsla([
                    ref(nsvariable('namespace', 'border-bottom-color-h', colorHDefault, options)),
                    ref(nsvariable('namespace', 'border-bottom-color-s', colorSDefault, options)),
                    ref(nsvariable('namespace', 'border-bottom-color-l', colorLDefault, options)),
                    ref(nsvariable('namespace', 'border-bottom-color-a', colorADefault, options))
                ]),
                options
            ),
            namespaceBorderLeftWidth: nsvariable('namespace', 'border-left-width', 0, options),
            namespaceBorderLeftStyle: nsvariable('namespace', 'border-left-style', 'none', options),
            namespaceBorderLeftColorH: nsvariable(
                'namespace',
                'border-left-color-h',
                colorHDefault,
                options
            ),
            namespaceBorderLeftColorS: nsvariable(
                'namespace',
                'border-left-color-s',
                colorSDefault,
                options
            ),
            namespaceBorderLeftColorL: nsvariable(
                'namespace',
                'border-left-color-l',
                colorLDefault,
                options
            ),
            namespaceBorderLeftColorA: nsvariable(
                'namespace',
                'border-left-color-a',
                colorADefault,
                options
            ),
            namespaceBorderLeftColor: nsvariable(
                'namespace',
                'border-left-color',
                hsla([
                    ref(nsvariable('namespace', 'border-left-color-h', colorHDefault, options)),
                    ref(nsvariable('namespace', 'border-left-color-s', colorSDefault, options)),
                    ref(nsvariable('namespace', 'border-left-color-l', colorLDefault, options)),
                    ref(nsvariable('namespace', 'border-left-color-a', colorADefault, options))
                ]),
                options
            ),
            namespaceBorderColor: nsvariable(
                'namespace',
                'border-color',
                [
                    ref(
                        nsvariable(
                            'namespace',
                            'border-top-color',
                            hsla([
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-top-color-h',
                                        colorHDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-top-color-s',
                                        colorSDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-top-color-l',
                                        colorLDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-top-color-a',
                                        colorADefault,
                                        options
                                    )
                                )
                            ]),
                            options
                        )
                    ),
                    ref(
                        nsvariable(
                            'namespace',
                            'border-right-color',
                            hsla([
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-right-color-h',
                                        colorHDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-right-color-s',
                                        colorSDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-right-color-l',
                                        colorLDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-right-color-a',
                                        colorADefault,
                                        options
                                    )
                                )
                            ]),
                            options
                        )
                    ),
                    ref(
                        nsvariable(
                            'namespace',
                            'border-bottom-color',
                            hsla([
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-bottom-color-h',
                                        colorHDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-bottom-color-s',
                                        colorSDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-bottom-color-l',
                                        colorLDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-bottom-color-a',
                                        colorADefault,
                                        options
                                    )
                                )
                            ]),
                            options
                        )
                    ),
                    ref(
                        nsvariable(
                            'namespace',
                            'border-left-color',
                            hsla([
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-left-color-h',
                                        colorHDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-left-color-s',
                                        colorSDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-left-color-l',
                                        colorLDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-left-color-a',
                                        colorADefault,
                                        options
                                    )
                                )
                            ]),
                            options
                        )
                    )
                ],
                options
            ),
            namespaceBorderStyle: nsvariable(
                'namespace',
                'border-style',
                [
                    ref(nsvariable('namespace', 'border-top-style', 'none', options)),
                    ref(nsvariable('namespace', 'border-right-style', 'none', options)),
                    ref(nsvariable('namespace', 'border-bottom-style', 'none', options)),
                    ref(nsvariable('namespace', 'border-left-style', 'none', options))
                ],
                options
            ),
            namespaceBorderWidth: nsvariable(
                'namespace',
                'border-width',
                [
                    ref(nsvariable('namespace', 'border-top-width', 0, options)),
                    ref(nsvariable('namespace', 'border-right-width', 0, options)),
                    ref(nsvariable('namespace', 'border-bottom-width', 0, options)),
                    ref(nsvariable('namespace', 'border-left-width', 0, options))
                ],
                options
            ),
            namespaceBorderTop: nsvariable(
                'namespace',
                'border-top',
                [
                    ref(nsvariable('namespace', 'border-top-width', 0, options)),
                    ref(nsvariable('namespace', 'border-top-style', 'none', options)),
                    ref(
                        nsvariable(
                            'namespace',
                            'border-top-color',
                            hsla([
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-top-color-h',
                                        colorHDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-top-color-s',
                                        colorSDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-top-color-l',
                                        colorLDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-top-color-a',
                                        colorADefault,
                                        options
                                    )
                                )
                            ]),
                            options
                        )
                    )
                ],
                options
            ),
            namespaceBorderRight: nsvariable(
                'namespace',
                'border-right',
                [
                    ref(nsvariable('namespace', 'border-right-width', 0, options)),
                    ref(nsvariable('namespace', 'border-right-style', 'none', options)),
                    ref(
                        nsvariable(
                            'namespace',
                            'border-right-color',
                            hsla([
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-right-color-h',
                                        colorHDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-right-color-s',
                                        colorSDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-right-color-l',
                                        colorLDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-right-color-a',
                                        colorADefault,
                                        options
                                    )
                                )
                            ]),
                            options
                        )
                    )
                ],
                options
            ),
            namespaceBorderBottom: nsvariable(
                'namespace',
                'border-bottom',
                [
                    ref(nsvariable('namespace', 'border-bottom-width', 0, options)),
                    ref(nsvariable('namespace', 'border-bottom-style', 'none', options)),
                    ref(
                        nsvariable(
                            'namespace',
                            'border-bottom-color',
                            hsla([
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-bottom-color-h',
                                        colorHDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-bottom-color-s',
                                        colorSDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-bottom-color-l',
                                        colorLDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-bottom-color-a',
                                        colorADefault,
                                        options
                                    )
                                )
                            ]),
                            options
                        )
                    )
                ],
                options
            ),
            namespaceBorderLeft: nsvariable(
                'namespace',
                'border-left',
                [
                    ref(nsvariable('namespace', 'border-left-width', 0, options)),
                    ref(nsvariable('namespace', 'border-left-style', 'none', options)),
                    ref(
                        nsvariable(
                            'namespace',
                            'border-left-color',
                            hsla([
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-left-color-h',
                                        colorHDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-left-color-s',
                                        colorSDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-left-color-l',
                                        colorLDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-left-color-a',
                                        colorADefault,
                                        options
                                    )
                                )
                            ]),
                            options
                        )
                    )
                ],
                options
            ),
            namespaceBorder: nsvariable(
                'namespace',
                'border',
                [
                    ref(nsvariable('namespace', 'border-top-width', 0, options)),
                    ref(nsvariable('namespace', 'border-top-style', 'none', options)),
                    ref(
                        nsvariable(
                            'namespace',
                            'border-top-color',
                            hsla([
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-top-color-h',
                                        colorHDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-top-color-s',
                                        colorSDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-top-color-l',
                                        colorLDefault,
                                        options
                                    )
                                ),
                                ref(
                                    nsvariable(
                                        'namespace',
                                        'border-top-color-a',
                                        colorADefault,
                                        options
                                    )
                                )
                            ]),
                            options
                        )
                    )
                ],
                options
            )
        });
    });

    it('should return object with namespaced properties', () => {
        const result = defineBorder('namespace', '1px solid black', options);

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
        const result = defineBorder('', '1px solid black', options);

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
