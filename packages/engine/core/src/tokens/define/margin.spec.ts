import { defineMargin } from './margin';
import { nsvariable } from '../variable';
import { ref } from '../ref';

describe('defineMargin', () => {
    it('should create default margin variables when no value is provided', () => {
        const result = defineMargin('namespace', '');
        expect(result).toEqual({
            namespaceMarginTop: nsvariable('namespace', 'margin-top', 0),
            namespaceMarginRight: nsvariable('namespace', 'margin-right', 0),
            namespaceMarginBottom: nsvariable('namespace', 'margin-bottom', 0),
            namespaceMarginLeft: nsvariable('namespace', 'margin-left', 0),
            namespaceMargin: nsvariable('namespace', 'margin', [
                ref(nsvariable('namespace', 'margin-top', 0)),
                ref(nsvariable('namespace', 'margin-right', 0)),
                ref(nsvariable('namespace', 'margin-bottom', 0)),
                ref(nsvariable('namespace', 'margin-left', 0))
            ])
        });
    });

    it('should set margin properties from object', () => {
        const value = {
            top: '10px',
            right: '20px',
            bottom: '30px',
            left: '40px'
        };
        const result = defineMargin('namespace', value);
        expect(result).toEqual({
            namespaceMarginTop: nsvariable('namespace', 'margin-top', '10px'),
            namespaceMarginRight: nsvariable('namespace', 'margin-right', '20px'),
            namespaceMarginBottom: nsvariable('namespace', 'margin-bottom', '30px'),
            namespaceMarginLeft: nsvariable('namespace', 'margin-left', '40px'),
            namespaceMargin: nsvariable('namespace', 'margin', [
                ref(nsvariable('namespace', 'margin-top', '10px')),
                ref(nsvariable('namespace', 'margin-right', '20px')),
                ref(nsvariable('namespace', 'margin-bottom', '30px')),
                ref(nsvariable('namespace', 'margin-left', '40px'))
            ])
        });
    });

    it('should set margin properties from string value with four values', () => {
        const value = '10px 20px 30px 40px';
        const result = defineMargin('namespace', value);
        expect(result).toEqual({
            namespaceMarginTop: nsvariable('namespace', 'margin-top', '10px'),
            namespaceMarginRight: nsvariable('namespace', 'margin-right', '20px'),
            namespaceMarginBottom: nsvariable('namespace', 'margin-bottom', '30px'),
            namespaceMarginLeft: nsvariable('namespace', 'margin-left', '40px'),
            namespaceMargin: nsvariable('namespace', 'margin', [
                ref(nsvariable('namespace', 'margin-top', '10px')),
                ref(nsvariable('namespace', 'margin-right', '20px')),
                ref(nsvariable('namespace', 'margin-bottom', '30px')),
                ref(nsvariable('namespace', 'margin-left', '40px'))
            ])
        });
    });

    it('should return object with namespaced properties', () => {
        const result = defineMargin('namespace', '10px');

        const {
            namespaceMarginTop,
            namespaceMarginRight,
            namespaceMarginBottom,
            namespaceMarginLeft,
            namespaceMargin
        } = result;

        expect(namespaceMarginTop).toBeDefined();
        expect(namespaceMarginRight).toBeDefined();
        expect(namespaceMarginBottom).toBeDefined();
        expect(namespaceMarginLeft).toBeDefined();
        expect(namespaceMargin).toBeDefined();
    });

    it('should return object with non-namespaced properties', () => {
        const result = defineMargin('', '10px');

        const { marginTop, marginRight, marginBottom, marginLeft, margin } = result;

        expect(marginTop).toBeDefined();
        expect(marginRight).toBeDefined();
        expect(marginBottom).toBeDefined();
        expect(marginLeft).toBeDefined();
        expect(margin).toBeDefined();
    });
});
