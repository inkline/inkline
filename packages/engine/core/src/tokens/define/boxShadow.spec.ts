import { defineBoxShadow } from './boxShadow';
import { nsvariable } from '../../tokens';
import { ref } from '../../tokens';

describe('defineBoxShadow', () => {
    it('should create default box shadow variables when no value is provided', () => {
        const result = defineBoxShadow('namespace', '');
        expect(result).toEqual({
            namespaceBoxShadowOffsetX: nsvariable('namespace', 'box-shadow-offset-x', 0),
            namespaceBoxShadowOffsetY: nsvariable('namespace', 'box-shadow-offset-y', 0),
            namespaceBoxShadowBlurRadius: nsvariable('namespace', 'box-shadow-blur-radius', 0),
            namespaceBoxShadowSpreadRadius: nsvariable('namespace', 'box-shadow-spread-radius', 0),
            namespaceBoxShadowColor: nsvariable('namespace', 'box-shadow-color', 'transparent'),
            namespaceBoxShadow: nsvariable('namespace', 'box-shadow', [
                ref(nsvariable('namespace', 'box-shadow-offset-x', 0)),
                ref(nsvariable('namespace', 'box-shadow-offset-y', 0)),
                ref(nsvariable('namespace', 'box-shadow-blur-radius', 0)),
                ref(nsvariable('namespace', 'box-shadow-spread-radius', 0)),
                ref(nsvariable('namespace', 'box-shadow-color', 'transparent'))
            ])
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
        const result = defineBoxShadow('namespace', value);
        expect(result).toEqual({
            namespaceBoxShadowOffsetX: nsvariable('namespace', 'box-shadow-offset-x', '2px'),
            namespaceBoxShadowOffsetY: nsvariable('namespace', 'box-shadow-offset-y', '4px'),
            namespaceBoxShadowBlurRadius: nsvariable('namespace', 'box-shadow-blur-radius', '8px'),
            namespaceBoxShadowSpreadRadius: nsvariable(
                'namespace',
                'box-shadow-spread-radius',
                '0px'
            ),
            namespaceBoxShadowColor: nsvariable(
                'namespace',
                'box-shadow-color',
                'rgba(0, 0, 0, 0.1)'
            ),
            namespaceBoxShadow: nsvariable('namespace', 'box-shadow', [
                ref(nsvariable('namespace', 'box-shadow-offset-x', '2px')),
                ref(nsvariable('namespace', 'box-shadow-offset-y', '4px')),
                ref(nsvariable('namespace', 'box-shadow-blur-radius', '8px')),
                ref(nsvariable('namespace', 'box-shadow-spread-radius', '0px')),
                ref(nsvariable('namespace', 'box-shadow-color', 'rgba(0, 0, 0, 0.1)'))
            ])
        });
    });

    it('should set box shadow properties from string value', () => {
        const value = '2px 4px 8px 0px rgba(0, 0, 0, 0.1)';
        const result = defineBoxShadow('namespace', value);
        expect(result).toEqual({
            namespaceBoxShadowOffsetX: nsvariable('namespace', 'box-shadow-offset-x', '2px'),
            namespaceBoxShadowOffsetY: nsvariable('namespace', 'box-shadow-offset-y', '4px'),
            namespaceBoxShadowBlurRadius: nsvariable('namespace', 'box-shadow-blur-radius', '8px'),
            namespaceBoxShadowSpreadRadius: nsvariable(
                'namespace',
                'box-shadow-spread-radius',
                '0px'
            ),
            namespaceBoxShadowColor: nsvariable(
                'namespace',
                'box-shadow-color',
                'rgba(0, 0, 0, 0.1)'
            ),
            namespaceBoxShadow: nsvariable('namespace', 'box-shadow', [
                ref(nsvariable('namespace', 'box-shadow-offset-x', '2px')),
                ref(nsvariable('namespace', 'box-shadow-offset-y', '4px')),
                ref(nsvariable('namespace', 'box-shadow-blur-radius', '8px')),
                ref(nsvariable('namespace', 'box-shadow-spread-radius', '0px')),
                ref(nsvariable('namespace', 'box-shadow-color', 'rgba(0, 0, 0, 0.1)'))
            ])
        });
    });

    it('should return object with namespaced properties', () => {
        const result = defineBoxShadow('namespace', '2px 4px 8px black');

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
        const result = defineBoxShadow('', '2px 4px 8px black');

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
