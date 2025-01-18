import { defineBorder } from './border';
import { nsvariable } from '../variable';
import { ref } from '../ref';
import { hsla } from '../color';
import { createContext } from '../../context';

const options = { context: createContext() };

describe('defineBorder', () => {
    it('should create default border variables when no value is provided', () => {
        const result = defineBorder('namespace', '', options);

        expect(result).toEqual({
            namespaceBorderTopWidth: nsvariable('namespace', 'border-top-width', 0, options),
            namespaceBorderTopStyle: nsvariable('namespace', 'border-top-style', 'none', options),
            namespaceBorderTopColor: nsvariable(
                'namespace',
                'border-top-color',
                'currentColor',
                options
            ),
            namespaceBorderRightWidth: nsvariable('namespace', 'border-right-width', 0, options),
            namespaceBorderRightStyle: nsvariable(
                'namespace',
                'border-right-style',
                'none',
                options
            ),
            namespaceBorderRightColor: nsvariable(
                'namespace',
                'border-right-color',
                'currentColor',
                options
            ),
            namespaceBorderBottomWidth: nsvariable('namespace', 'border-bottom-width', 0, options),
            namespaceBorderBottomStyle: nsvariable(
                'namespace',
                'border-bottom-style',
                'none',
                options
            ),
            namespaceBorderBottomColor: nsvariable(
                'namespace',
                'border-bottom-color',
                'currentColor',
                options
            ),
            namespaceBorderLeftWidth: nsvariable('namespace', 'border-left-width', 0, options),
            namespaceBorderLeftStyle: nsvariable('namespace', 'border-left-style', 'none', options),
            namespaceBorderLeftColor: nsvariable(
                'namespace',
                'border-left-color',
                'currentColor',
                options
            ),
            namespaceBorderColor: nsvariable(
                'namespace',
                'border-color',
                [
                    ref(nsvariable('namespace', 'border-top-color', 'currentColor', options)),
                    ref(nsvariable('namespace', 'border-right-color', 'currentColor', options)),
                    ref(nsvariable('namespace', 'border-bottom-color', 'currentColor', options)),
                    ref(nsvariable('namespace', 'border-left-color', 'currentColor', options))
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
                    ref(nsvariable('namespace', 'border-top-color', 'currentColor', options))
                ],
                options
            ),
            namespaceBorderRight: nsvariable(
                'namespace',
                'border-right',
                [
                    ref(nsvariable('namespace', 'border-right-width', 0, options)),
                    ref(nsvariable('namespace', 'border-right-style', 'none', options)),
                    ref(nsvariable('namespace', 'border-right-color', 'currentColor', options))
                ],
                options
            ),
            namespaceBorderBottom: nsvariable(
                'namespace',
                'border-bottom',
                [
                    ref(nsvariable('namespace', 'border-bottom-width', 0, options)),
                    ref(nsvariable('namespace', 'border-bottom-style', 'none', options)),
                    ref(nsvariable('namespace', 'border-bottom-color', 'currentColor', options))
                ],
                options
            ),
            namespaceBorderLeft: nsvariable(
                'namespace',
                'border-left',
                [
                    ref(nsvariable('namespace', 'border-left-width', 0, options)),
                    ref(nsvariable('namespace', 'border-left-style', 'none', options)),
                    ref(nsvariable('namespace', 'border-left-color', 'currentColor', options))
                ],
                options
            ),
            namespaceBorder: nsvariable(
                'namespace',
                'border',
                [
                    ref(nsvariable('namespace', 'border-top-width', 0, options)),
                    ref(nsvariable('namespace', 'border-top-style', 'none', options)),
                    ref(nsvariable('namespace', 'border-top-color', 'currentColor', options))
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
            namespaceBorderRightColor,
            namespaceBorderBottomColor,
            namespaceBorderLeftColor,
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
        expect(namespaceBorderRightColor).toBeDefined();
        expect(namespaceBorderBottomColor).toBeDefined();
        expect(namespaceBorderLeftColor).toBeDefined();
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
            borderRightColor,
            borderBottomColor,
            borderLeftColor,
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
        expect(borderRightColor).toBeDefined();
        expect(borderBottomColor).toBeDefined();
        expect(borderLeftColor).toBeDefined();
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
