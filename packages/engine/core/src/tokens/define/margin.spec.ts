import { defineMargin } from './margin';
import { nsvariable } from '../variable';
import { ref } from '../ref';
import { createContext } from '../../context';

const options = { context: createContext() };

describe('defineMargin', () => {
    it('should create default margin variables when no value is provided', () => {
        const result = defineMargin('namespace', '', options);
        expect(result).toEqual({
            namespaceMarginTop: nsvariable('namespace', 'margin-top', 0, options),
            namespaceMarginRight: nsvariable('namespace', 'margin-right', 0, options),
            namespaceMarginBottom: nsvariable('namespace', 'margin-bottom', 0, options),
            namespaceMarginLeft: nsvariable('namespace', 'margin-left', 0, options),
            namespaceMargin: nsvariable(
                'namespace',
                'margin',
                [
                    ref(nsvariable('namespace', 'margin-top', 0, options)),
                    ref(nsvariable('namespace', 'margin-right', 0, options)),
                    ref(nsvariable('namespace', 'margin-bottom', 0, options)),
                    ref(nsvariable('namespace', 'margin-left', 0, options))
                ],
                options
            )
        });
    });

    it('should set margin properties from object', () => {
        const value = {
            top: '10px',
            right: '20px',
            bottom: '30px',
            left: '40px'
        };
        const result = defineMargin('namespace', value, options);
        expect(result).toEqual({
            namespaceMarginTop: nsvariable('namespace', 'margin-top', '10px', options),
            namespaceMarginRight: nsvariable('namespace', 'margin-right', '20px', options),
            namespaceMarginBottom: nsvariable('namespace', 'margin-bottom', '30px', options),
            namespaceMarginLeft: nsvariable('namespace', 'margin-left', '40px', options),
            namespaceMargin: nsvariable(
                'namespace',
                'margin',
                [
                    ref(nsvariable('namespace', 'margin-top', '10px', options)),
                    ref(nsvariable('namespace', 'margin-right', '20px', options)),
                    ref(nsvariable('namespace', 'margin-bottom', '30px', options)),
                    ref(nsvariable('namespace', 'margin-left', '40px', options))
                ],
                options
            )
        });
    });

    it('should set margin properties from string value with four values', () => {
        const value = '10px 20px 30px 40px';
        const result = defineMargin('namespace', value, options);
        expect(result).toEqual({
            namespaceMarginTop: nsvariable('namespace', 'margin-top', '10px', options),
            namespaceMarginRight: nsvariable('namespace', 'margin-right', '20px', options),
            namespaceMarginBottom: nsvariable('namespace', 'margin-bottom', '30px', options),
            namespaceMarginLeft: nsvariable('namespace', 'margin-left', '40px', options),
            namespaceMargin: nsvariable(
                'namespace',
                'margin',
                [
                    ref(nsvariable('namespace', 'margin-top', '10px', options)),
                    ref(nsvariable('namespace', 'margin-right', '20px', options)),
                    ref(nsvariable('namespace', 'margin-bottom', '30px', options)),
                    ref(nsvariable('namespace', 'margin-left', '40px', options))
                ],
                options
            )
        });
    });

    it('should return object with namespaced properties', () => {
        const result = defineMargin('namespace', '10px', options);

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
        const result = defineMargin('', '10px', options);

        const { marginTop, marginRight, marginBottom, marginLeft, margin } = result;

        expect(marginTop).toBeDefined();
        expect(marginRight).toBeDefined();
        expect(marginBottom).toBeDefined();
        expect(marginLeft).toBeDefined();
        expect(margin).toBeDefined();
    });
});
