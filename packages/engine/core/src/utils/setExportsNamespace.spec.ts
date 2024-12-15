import { nsvariables } from '../tokens';
import { replaceExportsNamespace } from './replaceExportsNamespace';

describe('setExportsNamespace', () => {
    it('should set string namespace correctly', () => {
        const ns = 'old';
        const newns = 'new';
        const values = nsvariables(ns, {
            fontSize: '16px'
        });

        const result = replaceExportsNamespace(values, ns, newns);

        expect(result).toEqual({
            newFontSize: values.oldFontSize
        });
    });

    it('should set array namespace correctly', () => {
        const ns = ['old', 'nested'] as const;
        const newns = ['new', 'other'] as const;
        const values = nsvariables(ns, {
            fontSize: '16px'
        });

        const result = replaceExportsNamespace(values, ns, newns);

        expect(result).toEqual({
            newOtherFontSize: values.oldNestedFontSize
        });
    });
});
