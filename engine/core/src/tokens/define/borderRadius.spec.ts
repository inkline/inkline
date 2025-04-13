import { defineBorderRadius } from './borderRadius';
import { nsvariable } from '../variable';
import { ref } from '../ref';
import { createContext } from '../../context';

const options = { context: createContext() };

describe('defineBorderRadius', () => {
    it('should create default border radius variables when no value is provided', () => {
        const result = defineBorderRadius('namespace', '', options);
        expect(result).toEqual({
            namespaceBorderTopLeftRadius: nsvariable(
                'namespace',
                'border-top-left-radius',
                0,
                options
            ),
            namespaceBorderTopRightRadius: nsvariable(
                'namespace',
                'border-top-right-radius',
                0,
                options
            ),
            namespaceBorderBottomRightRadius: nsvariable(
                'namespace',
                'border-bottom-right-radius',
                0,
                options
            ),
            namespaceBorderBottomLeftRadius: nsvariable(
                'namespace',
                'border-bottom-left-radius',
                0,
                options
            ),
            namespaceBorderRadius: nsvariable(
                'namespace',
                'border-radius',
                [
                    ref(nsvariable('namespace', 'border-top-left-radius', 0, options)),
                    ref(nsvariable('namespace', 'border-top-right-radius', 0, options)),
                    ref(nsvariable('namespace', 'border-bottom-right-radius', 0, options)),
                    ref(nsvariable('namespace', 'border-bottom-left-radius', 0, options))
                ],
                options
            )
        });
    });

    it('should set border radius properties from object', () => {
        const value = {
            topLeft: '10px',
            topRight: '20px',
            bottomRight: '30px',
            bottomLeft: '40px'
        };
        const result = defineBorderRadius('namespace', value, options);
        expect(result).toEqual({
            namespaceBorderTopLeftRadius: nsvariable(
                'namespace',
                'border-top-left-radius',
                '10px',
                options
            ),
            namespaceBorderTopRightRadius: nsvariable(
                'namespace',
                'border-top-right-radius',
                '20px',
                options
            ),
            namespaceBorderBottomRightRadius: nsvariable(
                'namespace',
                'border-bottom-right-radius',
                '30px',
                options
            ),
            namespaceBorderBottomLeftRadius: nsvariable(
                'namespace',
                'border-bottom-left-radius',
                '40px',
                options
            ),
            namespaceBorderRadius: nsvariable(
                'namespace',
                'border-radius',
                [
                    ref(nsvariable('namespace', 'border-top-left-radius', '10px', options)),
                    ref(nsvariable('namespace', 'border-top-right-radius', '20px', options)),
                    ref(nsvariable('namespace', 'border-bottom-right-radius', '30px', options)),
                    ref(nsvariable('namespace', 'border-bottom-left-radius', '40px', options))
                ],
                options
            )
        });
    });

    it('should set border radius properties from string value', () => {
        const value = '10px 20px 30px 40px';
        const result = defineBorderRadius('namespace', value, options);
        expect(result).toEqual({
            namespaceBorderTopLeftRadius: nsvariable(
                'namespace',
                'border-top-left-radius',
                '10px',
                options
            ),
            namespaceBorderTopRightRadius: nsvariable(
                'namespace',
                'border-top-right-radius',
                '20px',
                options
            ),
            namespaceBorderBottomRightRadius: nsvariable(
                'namespace',
                'border-bottom-right-radius',
                '30px',
                options
            ),
            namespaceBorderBottomLeftRadius: nsvariable(
                'namespace',
                'border-bottom-left-radius',
                '40px',
                options
            ),
            namespaceBorderRadius: nsvariable(
                'namespace',
                'border-radius',
                [
                    ref(nsvariable('namespace', 'border-top-left-radius', '10px', options)),
                    ref(nsvariable('namespace', 'border-top-right-radius', '20px', options)),
                    ref(nsvariable('namespace', 'border-bottom-right-radius', '30px', options)),
                    ref(nsvariable('namespace', 'border-bottom-left-radius', '40px', options))
                ],
                options
            )
        });
    });

    it('should return object with namespaced properties', () => {
        const result = defineBorderRadius('namespace', '10px', options);

        const {
            namespaceBorderTopLeftRadius,
            namespaceBorderTopRightRadius,
            namespaceBorderBottomRightRadius,
            namespaceBorderBottomLeftRadius,
            namespaceBorderRadius
        } = result;

        expect(namespaceBorderTopLeftRadius).toBeDefined();
        expect(namespaceBorderTopRightRadius).toBeDefined();
        expect(namespaceBorderBottomRightRadius).toBeDefined();
        expect(namespaceBorderBottomLeftRadius).toBeDefined();
        expect(namespaceBorderRadius).toBeDefined();
    });

    it('should return object with non-namespaced properties', () => {
        const result = defineBorderRadius('', '10px', options);

        const {
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomRightRadius,
            borderBottomLeftRadius,
            borderRadius
        } = result;

        expect(borderTopLeftRadius).toBeDefined();
        expect(borderTopRightRadius).toBeDefined();
        expect(borderBottomRightRadius).toBeDefined();
        expect(borderBottomLeftRadius).toBeDefined();
        expect(borderRadius).toBeDefined();
    });
});
