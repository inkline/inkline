import {
    getCssVariablePreamblePath,
    getCssVariablePreamble,
    getCssVariableName,
    getCssVariableVariantName,
    getResolvedCssVariableVariantName,
    codegenCssVariables
} from './cssVariables';
import { createTestingGeneratorMeta } from '../../__tests__/utils';
import type { ResolvedTheme } from '../../types';
import { ClassifierType } from '../../types';

const theme = {
    colors: {
        $type: ClassifierType.Group,
        red: {
            $type: ClassifierType.PrimitiveVariants,
            default: {
                h: '0',
                s: '100%',
                l: '50%',
                a: 1
            }
        }
    },
    components: {
        $type: ClassifierType.Group,
        $ignoreKey: true,
        button: {
            $type: ClassifierType.EntityVariants,
            default: {
                $type: ClassifierType.Group,
                color: {
                    h: '240',
                    s: '100%',
                    l: '50%',
                    a: 1
                },
                icon: {
                    $type: ClassifierType.Group,
                    size: '16px'
                }
            },
            primary: {
                $type: ClassifierType.Group,
                spacing: '1rem',
                color: {
                    h: '0',
                    s: '100%',
                    l: '50%',
                    a: 1
                }
            }
        }
    }
} as unknown as ResolvedTheme;

describe('getCssVariablePreamblePath', () => {
    it('should return empty preamble path for primitive variants', () => {
        const meta = createTestingGeneratorMeta({
            path: ['colors', 'red', 'default'],
            theme
        });
        const result = getCssVariablePreamblePath(meta);
        expect(result).toEqual([]);
    });

    it('should filter out fields with $ignoreKey set to true', () => {
        const meta = createTestingGeneratorMeta({
            path: ['components'],
            theme
        });
        const result = getCssVariablePreamblePath(meta);
        expect(result).toEqual([]);
    });

    it('should filter out "default" variant name for entity variants', () => {
        const meta = createTestingGeneratorMeta({
            path: ['components', 'button', 'default'],
            theme
        });
        const result = getCssVariablePreamblePath(meta);
        expect(result).toEqual(['button']);
    });

    it('should include non-default variant name for entity variants', () => {
        const meta = createTestingGeneratorMeta({
            path: ['components', 'button', 'primary'],
            theme
        });
        const result = getCssVariablePreamblePath(meta);
        expect(result).toEqual(['button', 'primary']);
    });

    it('should include subgroups for entity variants', () => {
        const meta = createTestingGeneratorMeta({
            path: ['components', 'button', 'default', 'icon', 'size'],
            theme
        });
        const result = getCssVariablePreamblePath(meta);
        expect(result).toEqual(['button', 'icon']);
    });

    it('should not include unknown non-group field types', () => {
        const meta = createTestingGeneratorMeta({
            path: ['components', 'button', 'primary', 'spacing'],
            theme
        });
        const result = getCssVariablePreamblePath(meta);
        expect(result).toEqual(['button', 'primary']);
    });
});

describe('getCssVariablePreamble', () => {
    it('should get CSS variable preamble', () => {
        const result = getCssVariablePreamble(['components', 'button']);
        expect(result).toEqual('components--button--');
    });
});

describe('getCssVariableName', () => {
    it('should get CSS variable name', () => {
        const meta = createTestingGeneratorMeta({
            path: ['components', 'button', 'color'],
            theme
        });
        const result = getCssVariableName(meta);
        expect(result).toEqual('color');
    });
});

describe('getCssVariableVariantName', () => {
    it('should get CSS variable variant name', () => {
        const meta = createTestingGeneratorMeta({
            path: ['colors', 'red', 'shade-100'],
            theme
        });
        const result = getCssVariableVariantName(meta);
        expect(result).toEqual('shade-100');
    });

    it('should get fallback CSS variable variant name', () => {
        const meta = createTestingGeneratorMeta({
            path: ['components', 'button', 'color'],
            theme
        });
        const result = getCssVariableVariantName(meta);
        expect(result).toEqual('default');
    });
});

describe('getResolvedCssVariableVariantName', () => {
    it('should return empty string for default variant name', () => {
        const result = getResolvedCssVariableVariantName('default');
        expect(result).toEqual('');
    });

    it('should get resolved CSS variable variant name', () => {
        const result = getResolvedCssVariableVariantName('variant');
        expect(result).toEqual('-variant');
    });
});

describe('codegenCssVariables', () => {
    it('should set CSS variable', () => {
        const result = codegenCssVariables.set('color', 'red');
        expect(result).toEqual('--color: red;');
    });

    it('should get CSS variable without fallback', () => {
        const result = codegenCssVariables.get('color');
        expect(result).toEqual('var(--color)');
    });

    it('should get CSS variable with fallback', () => {
        const result = codegenCssVariables.get('color', 'black');
        expect(result).toEqual('var(--color, black)');
    });
});
