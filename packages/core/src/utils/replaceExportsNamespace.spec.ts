import { nsvariable } from '../tokens';
import { replaceExportsNamespace } from './replaceExportsNamespace';

describe('replaceExportsNamespace', () => {
    it('should replace string namespace with string namespace in keys correctly', () => {
        const ns = 'old';
        const newns = 'new';
        const values = {
            oldFontSize: nsvariable(ns, 'font-size', '16px'),
            oldColor: nsvariable(ns, 'color', 'red')
        };

        const result = replaceExportsNamespace(values, ns, newns);

        expect(result).toEqual({
            newFontSize: values.oldFontSize,
            newColor: values.oldColor
        });
    });

    it('should replace string namespace with array namespace in keys correctly', () => {
        const ns = 'old';
        const newns = ['new', 'other'] as const;
        const values = {
            oldFontSize: nsvariable(ns, 'font-size', '16px'),
            oldColor: nsvariable(ns, 'color', 'red')
        };

        const result = replaceExportsNamespace(values, ns, newns);

        expect(result).toEqual({
            newOtherFontSize: values.oldFontSize,
            newOtherColor: values.oldColor
        });
    });

    it('should replace array namespace with string namespace in keys correctly', () => {
        const ns = ['old', 'nested'] as const;
        const newns = 'new';
        const values = {
            oldNestedFontSize: nsvariable(ns, 'font-size', '16px'),
            oldNestedColor: nsvariable(ns, 'color', 'red')
        };

        const result = replaceExportsNamespace(values, ns, newns);

        expect(result).toEqual({
            newFontSize: values.oldNestedFontSize,
            newColor: values.oldNestedColor
        });
    });

    it('should replace array namespace with array namespace in keys correctly', () => {
        const ns = ['old', 'nested'] as const;
        const newns = ['new', 'other'] as const;
        const values = {
            oldNestedFontSize: nsvariable(ns, 'font-size', '16px'),
            oldNestedColor: nsvariable(ns, 'color', 'red')
        };

        const result = replaceExportsNamespace(values, ns, newns);

        expect(result).toEqual({
            newOtherFontSize: values.oldNestedFontSize,
            newOtherColor: values.oldNestedColor
        });
    });

    it('should replace namespace with empty string correctly', () => {
        const ns = 'old';
        const newns = '';
        const values = {
            oldFontSize: nsvariable(ns, 'font-size', '16px'),
            oldColor: nsvariable(ns, 'color', 'red')
        };

        const result = replaceExportsNamespace(values, ns, newns);

        expect(result).toEqual({
            fontSize: values.oldFontSize,
            color: values.oldColor
        });
    });

    it('should replace empty string with namespace correctly', () => {
        const ns = '';
        const newns = 'new';
        const values = {
            fontSize: nsvariable(ns, 'font-size', '16px'),
            color: nsvariable(ns, 'color', 'red')
        };

        const result = replaceExportsNamespace(values, ns, newns);

        expect(result).toEqual({
            newFontSize: values.fontSize,
            newColor: values.color
        });
    });
});
