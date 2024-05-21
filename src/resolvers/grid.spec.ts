import {
    resolveGridGutter,
    resolveGridGutterVariant,
    gridGutterResolver,
    resolveGridContainer,
    resolveGridContainerVariant,
    gridContainerResolver,
    gridColumnsResolver
} from './grid';
import { createTestingResolverMeta } from '../__tests__/utils';
import { matchKey } from '../utils';

describe('resolveGridGutter', () => {
    const meta = createTestingResolverMeta({ path: ['grid', 'gutter'] });

    it('should return the same gutter when gutter is a string', () => {
        const gutter = '10px';
        const result = resolveGridGutter(gutter, meta);
        expect(result).toEqual(gutter);
    });

    it('should return the gutter with css variables when gutter is a variable', () => {
        const gutter = 'var(--gutter)';
        const result = resolveGridGutter(gutter, meta);
        expect(result).toEqual(gutter);
    });
});

describe('resolveGridGutterVariant', () => {
    const meta = createTestingResolverMeta({ path: ['grid', 'gutter', 'variant'] });

    it('should return the same gutter when variant is a string', () => {
        const variant = '15px';
        const result = resolveGridGutterVariant(variant, meta);
        expect(result).toEqual(variant);
    });

    it('should return the gutter with css variables when variant is a variable', () => {
        const variant = 'var(--gutter-variant)';
        const result = resolveGridGutterVariant(variant, meta);
        expect(result).toEqual(variant);
    });

    it('should modify the gutter with modifiers when variant is an object with modifiers', () => {
        const variant = {
            add: '5px',
            subtract: '2px',
            multiply: '2',
            divide: '2'
        };
        const result = resolveGridGutterVariant(variant, meta);
        expect(result).toEqual('calc(calc(calc(calc(var(--gutter) + 5px) - 2px) * 2) / 2)');
    });
});

describe('gridGutterResolver', () => {
    describe('match', () => {
        it.each([
            ['grid.gutter', false],
            ['grid.gutter.sm', true],
            ['other.grid.gutter.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (gridGutterResolver.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});

describe('resolveGridContainer', () => {
    const meta = createTestingResolverMeta({ path: ['grid', 'container'] });

    it('should return the same container when container is a string', () => {
        const container = '1200px';
        const result = resolveGridContainer(container, meta);
        expect(result).toEqual(container);
    });

    it('should return the container with css variables when container is a variable', () => {
        const container = 'var(--container)';
        const result = resolveGridContainer(container, meta);
        expect(result).toEqual(container);
    });
});

describe('resolveGridContainerVariant', () => {
    const meta = createTestingResolverMeta({ path: ['grid', 'container', 'variant'] });

    it('should return the same container when variant is a string', () => {
        const variant = '1400px';
        const result = resolveGridContainerVariant(variant, meta);
        expect(result).toEqual(variant);
    });

    it('should return the container with css variables when variant is a variable', () => {
        const variant = 'var(--container-variant)';
        const result = resolveGridContainerVariant(variant, meta);
        expect(result).toEqual(variant);
    });
});

describe('gridContainerResolver', () => {
    describe('match', () => {
        it.each([
            ['grid.container', false],
            ['grid.container.xs', true],
            ['components.button.default.grid.container', false],
            ['other.grid.container.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (gridContainerResolver.key as RegExp[]).some((key) =>
                matchKey(path, key)
            );
            expect(match).toBe(result);
        });
    });
});

describe('gridColumnsResolver', () => {
    const meta = createTestingResolverMeta({ path: ['grid', 'columns'] });

    it('should return the same number of columns', () => {
        const columns = 12;
        const result = gridColumnsResolver.resolve(columns, meta);
        expect(result).toEqual(columns);
    });
});
