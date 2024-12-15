import { nsvariables } from '../tokens';
import { replaceExportsNamespace } from './replaceExportsNamespace';

describe('replaceExportsNamespace', () => {
    it('should replace string namespace with string namespace in keys correctly', () => {
        const ns = 'old';
        const newns = 'new';
        const values = nsvariables(ns, {
            fontSize: '16px',
            custom: 'red'
        });

        const result = replaceExportsNamespace(values, ns, newns);

        expect(result).toEqual({
            newFontSize: values.oldFontSize,
            newCustom: values.oldCustom
        });
    });

    it('should replace string namespace with array namespace in keys correctly', () => {
        const ns = 'old';
        const newns = ['new', 'other'] as const;
        const values = nsvariables(ns, {
            fontSize: '16px',
            custom: 'red'
        });

        const result = replaceExportsNamespace(values, ns, newns);

        expect(result).toEqual({
            newOtherFontSize: values.oldFontSize,
            newOtherCustom: values.oldCustom
        });
    });

    it('should replace array namespace with string namespace in keys correctly', () => {
        const ns = ['old', 'nested'] as const;
        const newns = 'new';
        const values = nsvariables(ns, {
            fontSize: '16px',
            custom: 'red'
        });

        const result = replaceExportsNamespace(values, ns, newns);

        expect(result).toEqual({
            newFontSize: values.oldNestedFontSize,
            newCustom: values.oldNestedCustom
        });
    });

    it('should replace array namespace with array namespace in keys correctly', () => {
        const ns = ['old', 'nested'] as const;
        const newns = ['new', 'other'] as const;
        const values = nsvariables(ns, {
            fontSize: '16px',
            custom: 'red'
        });

        const result = replaceExportsNamespace(values, ns, newns);

        expect(result).toEqual({
            newOtherFontSize: values.oldNestedFontSize,
            newOtherCustom: values.oldNestedCustom
        });
    });

    it('should replace namespace with empty string correctly', () => {
        const ns = 'old';
        const newns = '';
        const values = nsvariables(ns, {
            fontSize: '16px',
            custom: 'red'
        });

        const result = replaceExportsNamespace(values, ns, newns);

        expect(result).toEqual({
            fontSize: values.oldFontSize,
            custom: values.oldCustom
        });
    });

    it('should replace empty string with namespace correctly', () => {
        const ns = '';
        const newns = 'new';
        const values = nsvariables(ns, {
            fontSize: '16px',
            custom: 'red'
        });

        const result = replaceExportsNamespace(values, ns, newns);

        expect(result).toEqual({
            newFontSize: values.fontSize,
            newCustom: values.custom
        });
    });
});
