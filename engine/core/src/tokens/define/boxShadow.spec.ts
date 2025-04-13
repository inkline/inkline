import { defineBoxShadow } from './boxShadow';
import { nsvariable } from '../../tokens';
import { ref } from '../../tokens';
import { createContext } from '../../context';

const options = { context: createContext() };

describe('defineBoxShadow', () => {
    it('should create default box shadow variables when no value is provided', () => {
        const result = defineBoxShadow('namespace', '', options);
        expect(result).toEqual({
            namespaceBoxShadowOffsetX: nsvariable('namespace', 'box-shadow-offset-x', 0, options),
            namespaceBoxShadowOffsetY: nsvariable('namespace', 'box-shadow-offset-y', 0, options),
            namespaceBoxShadowBlurRadius: nsvariable(
                'namespace',
                'box-shadow-blur-radius',
                0,
                options
            ),
            namespaceBoxShadowSpreadRadius: nsvariable(
                'namespace',
                'box-shadow-spread-radius',
                0,
                options
            ),
            namespaceBoxShadowColor: nsvariable(
                'namespace',
                'box-shadow-color',
                'transparent',
                options
            ),
            namespaceBoxShadow: nsvariable(
                'namespace',
                'box-shadow',
                [
                    ref(nsvariable('namespace', 'box-shadow-offset-x', 0, options)),
                    ref(nsvariable('namespace', 'box-shadow-offset-y', 0, options)),
                    ref(nsvariable('namespace', 'box-shadow-blur-radius', 0, options)),
                    ref(nsvariable('namespace', 'box-shadow-spread-radius', 0, options)),
                    ref(nsvariable('namespace', 'box-shadow-color', 'transparent', options))
                ],
                options
            )
        });
    });

    it('should set box shadow properties from object', () => {
        const value = {
            offsetX: '2px',
            offsetY: '4px',
            blurRadius: '8px',
            spreadRadius: '0px',
            color: 'rgba(0, 0, 0, 0.1)'
        };
        const result = defineBoxShadow('namespace', value, options);
        expect(result).toEqual({
            namespaceBoxShadowOffsetX: nsvariable(
                'namespace',
                'box-shadow-offset-x',
                '2px',
                options
            ),
            namespaceBoxShadowOffsetY: nsvariable(
                'namespace',
                'box-shadow-offset-y',
                '4px',
                options
            ),
            namespaceBoxShadowBlurRadius: nsvariable(
                'namespace',
                'box-shadow-blur-radius',
                '8px',
                options
            ),
            namespaceBoxShadowSpreadRadius: nsvariable(
                'namespace',
                'box-shadow-spread-radius',
                '0px',
                options
            ),
            namespaceBoxShadowColor: nsvariable(
                'namespace',
                'box-shadow-color',
                'rgba(0, 0, 0, 0.1)',
                options
            ),
            namespaceBoxShadow: nsvariable(
                'namespace',
                'box-shadow',
                [
                    ref(nsvariable('namespace', 'box-shadow-offset-x', '2px', options)),
                    ref(nsvariable('namespace', 'box-shadow-offset-y', '4px', options)),
                    ref(nsvariable('namespace', 'box-shadow-blur-radius', '8px', options)),
                    ref(nsvariable('namespace', 'box-shadow-spread-radius', '0px', options)),
                    ref(nsvariable('namespace', 'box-shadow-color', 'rgba(0, 0, 0, 0.1)', options))
                ],
                options
            )
        });
    });

    it('should set box shadow properties from string value', () => {
        const value = '2px 4px 8px 0px rgba(0, 0, 0, 0.1)';
        const result = defineBoxShadow('namespace', value, options);
        expect(result).toEqual({
            namespaceBoxShadowOffsetX: nsvariable(
                'namespace',
                'box-shadow-offset-x',
                '2px',
                options
            ),
            namespaceBoxShadowOffsetY: nsvariable(
                'namespace',
                'box-shadow-offset-y',
                '4px',
                options
            ),
            namespaceBoxShadowBlurRadius: nsvariable(
                'namespace',
                'box-shadow-blur-radius',
                '8px',
                options
            ),
            namespaceBoxShadowSpreadRadius: nsvariable(
                'namespace',
                'box-shadow-spread-radius',
                '0px',
                options
            ),
            namespaceBoxShadowColor: nsvariable(
                'namespace',
                'box-shadow-color',
                'rgba(0, 0, 0, 0.1)',
                options
            ),
            namespaceBoxShadow: nsvariable(
                'namespace',
                'box-shadow',
                [
                    ref(nsvariable('namespace', 'box-shadow-offset-x', '2px', options)),
                    ref(nsvariable('namespace', 'box-shadow-offset-y', '4px', options)),
                    ref(nsvariable('namespace', 'box-shadow-blur-radius', '8px', options)),
                    ref(nsvariable('namespace', 'box-shadow-spread-radius', '0px', options)),
                    ref(nsvariable('namespace', 'box-shadow-color', 'rgba(0, 0, 0, 0.1)', options))
                ],
                options
            )
        });
    });

    it('should return object with namespaced properties', () => {
        const result = defineBoxShadow('namespace', '2px 4px 8px black', options);

        const {
            namespaceBoxShadowOffsetX,
            namespaceBoxShadowOffsetY,
            namespaceBoxShadowBlurRadius,
            namespaceBoxShadowSpreadRadius,
            namespaceBoxShadowColor,
            namespaceBoxShadow
        } = result;

        expect(namespaceBoxShadowOffsetX).toBeDefined();
        expect(namespaceBoxShadowOffsetY).toBeDefined();
        expect(namespaceBoxShadowBlurRadius).toBeDefined();
        expect(namespaceBoxShadowSpreadRadius).toBeDefined();
        expect(namespaceBoxShadowColor).toBeDefined();
        expect(namespaceBoxShadow).toBeDefined();
    });

    it('should return object with non-namespaced properties', () => {
        const result = defineBoxShadow('', '2px 4px 8px black', options);

        const {
            boxShadowOffsetX,
            boxShadowOffsetY,
            boxShadowBlurRadius,
            boxShadowSpreadRadius,
            boxShadowColor,
            boxShadow
        } = result;

        expect(boxShadowOffsetX).toBeDefined();
        expect(boxShadowOffsetY).toBeDefined();
        expect(boxShadowBlurRadius).toBeDefined();
        expect(boxShadowSpreadRadius).toBeDefined();
        expect(boxShadowColor).toBeDefined();
        expect(boxShadow).toBeDefined();
    });
});
