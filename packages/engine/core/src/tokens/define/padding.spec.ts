import { definePadding } from './padding';
import { nsvariable } from '../variable';
import { ref } from '../ref';
import { createContext } from '../../context';

const options = { context: createContext() };

describe('definePadding', () => {
    it('should create default padding variables when no value is provided', () => {
        const result = definePadding('namespace', '', options);
        expect(result).toEqual({
            namespacePaddingTop: nsvariable('namespace', 'padding-top', 0, options),
            namespacePaddingRight: nsvariable('namespace', 'padding-right', 0, options),
            namespacePaddingBottom: nsvariable('namespace', 'padding-bottom', 0, options),
            namespacePaddingLeft: nsvariable('namespace', 'padding-left', 0, options),
            namespacePadding: nsvariable(
                'namespace',
                'padding',
                [
                    ref(nsvariable('namespace', 'padding-top', 0, options)),
                    ref(nsvariable('namespace', 'padding-right', 0, options)),
                    ref(nsvariable('namespace', 'padding-bottom', 0, options)),
                    ref(nsvariable('namespace', 'padding-left', 0, options))
                ],
                options
            )
        });
    });

    it('should set padding properties from object', () => {
        const value = {
            top: '10px',
            right: '20px',
            bottom: '30px',
            left: '40px'
        };
        const result = definePadding('namespace', value, options);
        expect(result).toEqual({
            namespacePaddingTop: nsvariable('namespace', 'padding-top', '10px', options),
            namespacePaddingRight: nsvariable('namespace', 'padding-right', '20px', options),
            namespacePaddingBottom: nsvariable('namespace', 'padding-bottom', '30px', options),
            namespacePaddingLeft: nsvariable('namespace', 'padding-left', '40px', options),
            namespacePadding: nsvariable(
                'namespace',
                'padding',
                [
                    ref(nsvariable('namespace', 'padding-top', '10px', options)),
                    ref(nsvariable('namespace', 'padding-right', '20px', options)),
                    ref(nsvariable('namespace', 'padding-bottom', '30px', options)),
                    ref(nsvariable('namespace', 'padding-left', '40px', options))
                ],
                options
            )
        });
    });

    it('should set padding properties from string value with four values', () => {
        const value = '10px 20px 30px 40px';
        const result = definePadding('namespace', value, options);
        expect(result).toEqual({
            namespacePaddingTop: nsvariable('namespace', 'padding-top', '10px', options),
            namespacePaddingRight: nsvariable('namespace', 'padding-right', '20px', options),
            namespacePaddingBottom: nsvariable('namespace', 'padding-bottom', '30px', options),
            namespacePaddingLeft: nsvariable('namespace', 'padding-left', '40px', options),
            namespacePadding: nsvariable(
                'namespace',
                'padding',
                [
                    ref(nsvariable('namespace', 'padding-top', '10px', options)),
                    ref(nsvariable('namespace', 'padding-right', '20px', options)),
                    ref(nsvariable('namespace', 'padding-bottom', '30px', options)),
                    ref(nsvariable('namespace', 'padding-left', '40px', options))
                ],
                options
            )
        });
    });

    it('should return object with namespaced properties', () => {
        const result = definePadding('namespace', '10px', options);

        const {
            namespacePaddingTop,
            namespacePaddingRight,
            namespacePaddingBottom,
            namespacePaddingLeft,
            namespacePadding
        } = result;

        expect(namespacePaddingTop).toBeDefined();
        expect(namespacePaddingRight).toBeDefined();
        expect(namespacePaddingBottom).toBeDefined();
        expect(namespacePaddingLeft).toBeDefined();
        expect(namespacePadding).toBeDefined();
    });

    it('should return object with non-namespaced properties', () => {
        const result = definePadding('', '10px', options);

        const { paddingTop, paddingRight, paddingBottom, paddingLeft, padding } = result;

        expect(paddingTop).toBeDefined();
        expect(paddingRight).toBeDefined();
        expect(paddingBottom).toBeDefined();
        expect(paddingLeft).toBeDefined();
        expect(padding).toBeDefined();
    });
});
