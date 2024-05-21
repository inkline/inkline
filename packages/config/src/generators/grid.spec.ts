import {
    gridColumnsGenerator,
    gridColumnsMixinsGenerator,
    gridContainerGenerator,
    gridGutterGenerator
} from './grid';
import { createTestingGeneratorMeta } from '../__tests__/utils';
import { matchKey } from '../utils';

describe('gridColumnsGenerator', () => {
    describe('generate', () => {
        it('should generate css variables for grid columns', () => {
            const meta = createTestingGeneratorMeta({ path: ['grid', 'columns'] });
            const result = gridColumnsGenerator.generate(12, meta);
            expect(result).toEqual(['--columns: 12;']);
        });
    });

    describe('match', () => {
        it.each([
            ['grid', false],
            ['grid.columns', true],
            ['components.button.grid.columns', false],
            ['other.grid.columns.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, gridColumnsGenerator.key as string);
            expect(match).toBe(result);
        });
    });
});

describe('gridColumnsMixinsGenerator', () => {
    describe('generate', () => {
        it('should generate scss variables for grid columns', () => {
            const meta = createTestingGeneratorMeta({ path: ['grid', 'columns'] });
            const result = gridColumnsMixinsGenerator.generate(12, meta);
            expect(result).toEqual(['$columns: 12 !default;']);
        });
    });

    describe('match', () => {
        it.each([
            ['grid', false],
            ['grid.columns', true],
            ['components.button.grid.columns', false],
            ['other.grid.columns.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, gridColumnsMixinsGenerator.key as string);
            expect(match).toBe(result);
        });
    });
});

describe('gridContainerGenerator', () => {
    describe('generate', () => {
        it('should generate css variables for grid container', () => {
            const meta = createTestingGeneratorMeta({ path: ['grid', 'container', 'md'] });
            const result = gridContainerGenerator.generate('750px', meta);
            expect(result).toEqual(['--container-md: 750px;']);
        });

        it('should not generate css variables for default grid container', () => {
            const meta = createTestingGeneratorMeta({ path: ['grid', 'container', 'default'] });
            const result = gridContainerGenerator.generate('100%', meta);
            expect(result).toEqual([]);
        });
    });

    describe('match', () => {
        it.each([
            ['grid', false],
            ['grid.container', false],
            ['grid.container.md', true],
            ['components.button.grid.container.md', false],
            ['other.grid.container.md.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, gridContainerGenerator.key as string);
            expect(match).toBe(result);
        });
    });
});

describe('gridGutterGenerator', () => {
    describe('generate', () => {
        it('should generate css variables for grid gutter', () => {
            const meta = createTestingGeneratorMeta({ path: ['grid', 'gutter', 'md'] });
            const result = gridGutterGenerator.generate('16px', meta);
            expect(result).toEqual(['--gutter-md: 16px;']);
        });
    });

    describe('match', () => {
        it.each([
            ['grid', false],
            ['grid.gutter', false],
            ['grid.gutter.md', true],
            ['components.button.grid.gutter.md', false],
            ['other.grid.gutter.md.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, gridGutterGenerator.key as string);
            expect(match).toBe(result);
        });
    });
});
