import { nsvariables } from '../tokens';
import { stripExportsNamespace } from './stripExportsNamespace';

describe('stripExportsNamespace', () => {
    it('should strip string namespace from keys correctly', () => {
        const ns = 'old';
        const values = nsvariables(ns, {
            fontSize: '16px'
        });

        const result = stripExportsNamespace(values);

        expect(result).toEqual({
            fontSize: values.oldFontSize
        });
    });

    it('should strip array namespace from keys correctly', () => {
        const ns = ['old', 'nested'] as const;
        const values = nsvariables(ns, {
            fontSize: '16px'
        });

        const result = stripExportsNamespace(values);

        expect(result).toEqual({
            fontSize: values.oldNestedFontSize
        });
    });
});
