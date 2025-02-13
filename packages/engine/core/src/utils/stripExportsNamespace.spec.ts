import { nsvariables, ref } from '../tokens';
import { stripExportsNamespace } from './stripExportsNamespace';
import { createContext } from '../context';

const options = { context: createContext() };

describe('stripExportsNamespace', () => {
    it('should strip string namespace and have correct type', () => {
        const ns = 'old';
        const values = nsvariables(
            ns,
            {
                fontSize: '16px'
            },
            options
        );

        const { fontSize } = stripExportsNamespace(values);

        expect(fontSize).toEqual(values.oldFontSize);
    });

    it('should strip string namespace from keys correctly', () => {
        const ns = 'old';
        const values = nsvariables(
            ns,
            {
                fontSize: '16px'
            },
            options
        );

        const result = stripExportsNamespace(values);

        expect(result).toEqual({
            fontSize: values.oldFontSize
        });
    });

    it('should strip array namespace from primitive and have correct type', () => {
        const ns = ['old', 'nested'] as const;
        const values = nsvariables(
            ns,
            {
                fontSize: '16px'
            },
            options
        );

        const { fontSize } = stripExportsNamespace(values);

        expect(fontSize).toEqual(values.oldNestedFontSize);
    });

    it('should strip array namespace from non-variables object and have correct type', () => {
        const ns = ['old', 'nested'] as const;
        const values = nsvariables(
            ns,
            {
                fontSize: ref('example')
            },
            options
        );

        const { fontSize } = stripExportsNamespace(values);

        expect(fontSize).toEqual(values.oldNestedFontSize);
    });

    it('should strip array namespace from keys correctly', () => {
        const ns = ['old', 'nested'] as const;
        const values = nsvariables(
            ns,
            {
                fontSize: '16px',
                color: {
                    h: 0,
                    s: '100%',
                    l: '50%',
                    a: 1
                }
            },
            options
        );

        const result = stripExportsNamespace(values);

        expect(result).toEqual({
            fontSize: values.oldNestedFontSize,
            color: values.oldNestedColor
        });
    });

    it('should strip string namespace from nested object and have correct type', () => {
        const ns = 'namespace';
        const values = nsvariables(
            ns,
            {
                fontSize: '16px',
                nested: {
                    lineHeight: '16px',
                    fontSize: '14px'
                }
            },
            options
        );

        const { fontSize, nestedFontSize, nestedLineHeight } = stripExportsNamespace(values);

        expect(fontSize).toBeDefined();
        expect(nestedFontSize).toBeDefined();
        expect(nestedLineHeight).toBeDefined();
    });

    it('should strip array namespace from nested object and have correct type', () => {
        const ns = ['old', 'namespace'] as const;
        const values = nsvariables(
            ns,
            {
                fontSize: '16px',
                nested: {
                    lineHeight: '16px',
                    fontSize: '14px'
                }
            },
            options
        );

        const { fontSize, nestedFontSize, nestedLineHeight } = stripExportsNamespace(values);

        expect(fontSize).toBeDefined();
        expect(nestedFontSize).toBeDefined();
        expect(nestedLineHeight).toBeDefined();
    });

    it('should strip namespace from nested define object and have correct type', () => {
        const ns = ['old', 'namespace'] as const;
        const values = nsvariables(
            ns,
            {
                fontSize: '16px',
                color: {
                    h: 0,
                    s: '100%',
                    l: '50%',
                    a: 1
                },
                nested: {
                    margin: {
                        top: '16px',
                        right: '16px',
                        bottom: '16px',
                        left: '16px'
                    }
                }
            },
            options
        );

        const {
            fontSize,
            color,
            nestedMargin,
            nestedMarginTop,
            nestedMarginRight,
            nestedMarginBottom,
            nestedMarginLeft
        } = stripExportsNamespace(values);

        expect(fontSize).toBeDefined();
        expect(color).toBeDefined();
        expect(nestedMargin).toBeDefined();
        expect(nestedMarginTop).toBeDefined();
        expect(nestedMarginRight).toBeDefined();
        expect(nestedMarginBottom).toBeDefined();
        expect(nestedMarginLeft).toBeDefined();
    });
});
