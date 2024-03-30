import { describe, it, expect } from 'vitest';
import {
    resolveGridGutter,
    resolveGridGutterVariant,
    resolveGridContainer,
    resolveGridContainerVariant,
    gridContainerResolver,
    gridColumnsResolver,
    gridGutterResolver
} from './grid';
import { createTestingResolverMeta } from '../__tests__/utils';

describe('resolveGridGutter', () => {
    const meta = createTestingResolverMeta({ path: ['grid', 'gutter'] });

    it('should correctly resolve grid gutter value', () => {
        const gutter = '10px';
        const result = resolveGridGutter(gutter, meta);
        expect(result).toBe(gutter);
    });
});

describe('resolveGridGutterVariant', () => {
    const meta = createTestingResolverMeta({ path: ['grid', 'gutter', 'xs'] });

    it('should correctly resolve grid gutter variant value', () => {
        const gutter = '20px';
        const result = resolveGridGutterVariant(gutter, meta);
        expect(result).toBe(gutter);
    });
});

describe('gridGutterResolver', () => {
    const meta = createTestingResolverMeta({ path: ['grid', 'gutter'] });

    it('should resolve grid gutter with optional variants', () => {
        const value = {
            default: '10px',
            sm: '20px'
        };

        const result = gridGutterResolver.resolve(value, meta);
        expect(result).toEqual(value);
    });
});

describe('resolveGridContainer', () => {
    const meta = createTestingResolverMeta({ path: ['grid', 'container'] });

    it('should correctly resolve grid container value', () => {
        const container = '1200px';
        const result = resolveGridContainer(container, meta);
        expect(result).toBe(container);
    });
});

describe('resolveGridContainerVariant', () => {
    const meta = createTestingResolverMeta({ path: ['grid', 'container'] });

    it('should correctly resolve grid container variant value', () => {
        const container = '1000px';
        const result = resolveGridContainerVariant(container, meta);
        expect(result).toBe(container);
    });
});

describe('gridContainerResolver', () => {
    const meta = createTestingResolverMeta({ path: ['grid', 'container'] });

    it('should resolve grid container with optional variants', () => {
        const value = {
            default: '1200px',
            sm: '1000px'
        };

        // Assuming createFieldWithOptionalVariantsResolveFn is correctly implemented
        const result = gridContainerResolver.resolve(value, meta);
        expect(result).toEqual(value);
    });
});

describe('gridColumnsResolver', () => {
    const meta = createTestingResolverMeta({ path: ['grid', 'columns'] });

    it('should correctly resolve grid columns value', () => {
        const columns = 12;
        const result = gridColumnsResolver.resolve(columns, meta);

        expect(result).toBe(columns);
    });
});
