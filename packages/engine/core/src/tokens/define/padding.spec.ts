import { definePadding } from './padding';
import { nsvariable } from '../variable';
import { ref } from '../ref';

describe('definePadding', () => {
    it('should create default padding variables when no value is provided', () => {
        const result = definePadding('namespace', '');
        expect(result).toEqual({
            namespacePaddingTop: nsvariable('namespace', 'padding-top', 0),
            namespacePaddingRight: nsvariable('namespace', 'padding-right', 0),
            namespacePaddingBottom: nsvariable('namespace', 'padding-bottom', 0),
            namespacePaddingLeft: nsvariable('namespace', 'padding-left', 0),
            namespacePadding: nsvariable('namespace', 'padding', [
                ref(nsvariable('namespace', 'padding-top', 0)),
                ref(nsvariable('namespace', 'padding-right', 0)),
                ref(nsvariable('namespace', 'padding-bottom', 0)),
                ref(nsvariable('namespace', 'padding-left', 0))
            ])
        });
    });

    it('should set padding properties from object', () => {
        const value = {
            top: '10px',
            right: '20px',
            bottom: '30px',
            left: '40px'
        };
        const result = definePadding('namespace', value);
        expect(result).toEqual({
            namespacePaddingTop: nsvariable('namespace', 'padding-top', '10px'),
            namespacePaddingRight: nsvariable('namespace', 'padding-right', '20px'),
            namespacePaddingBottom: nsvariable('namespace', 'padding-bottom', '30px'),
            namespacePaddingLeft: nsvariable('namespace', 'padding-left', '40px'),
            namespacePadding: nsvariable('namespace', 'padding', [
                ref(nsvariable('namespace', 'padding-top', '10px')),
                ref(nsvariable('namespace', 'padding-right', '20px')),
                ref(nsvariable('namespace', 'padding-bottom', '30px')),
                ref(nsvariable('namespace', 'padding-left', '40px'))
            ])
        });
    });

    it('should set padding properties from string value with four values', () => {
        const value = '10px 20px 30px 40px';
        const result = definePadding('namespace', value);
        expect(result).toEqual({
            namespacePaddingTop: nsvariable('namespace', 'padding-top', '10px'),
            namespacePaddingRight: nsvariable('namespace', 'padding-right', '20px'),
            namespacePaddingBottom: nsvariable('namespace', 'padding-bottom', '30px'),
            namespacePaddingLeft: nsvariable('namespace', 'padding-left', '40px'),
            namespacePadding: nsvariable('namespace', 'padding', [
                ref(nsvariable('namespace', 'padding-top', '10px')),
                ref(nsvariable('namespace', 'padding-right', '20px')),
                ref(nsvariable('namespace', 'padding-bottom', '30px')),
                ref(nsvariable('namespace', 'padding-left', '40px'))
            ])
        });
    });
    
    it('should return object with namespaced properties', () => {
        const result = definePadding('namespace', '10px');

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
        const result = definePadding('', '10px');

        const { paddingTop, paddingRight, paddingBottom, paddingLeft, padding } = result;

        expect(paddingTop).toBeDefined();
        expect(paddingRight).toBeDefined();
        expect(paddingBottom).toBeDefined();
        expect(paddingLeft).toBeDefined();
        expect(padding).toBeDefined();
    });
});
