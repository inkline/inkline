import { layersGenerator, layersResolver } from './layers';
import { createTestingGeneratorMeta, createTestingResolverMeta } from '../__tests__/utils';
import { matchKey } from '../utils';

describe('layersResolver', () => {
    const meta = createTestingResolverMeta({ path: ['layers'] });

    it('should return the same value', () => {
        const layers = ['base', 'components'];
        const result = layersResolver.resolve(layers, meta);
        expect(result).toEqual(layers);
    });

    describe('match', () => {
        it.each([
            ['layers', true],
            ['components.button.default.layers', false],
            ['other.layers.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, layersResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});

describe('layersGenerator', () => {
    describe('generate', () => {
        it('should generate css layer directives for multiple layers', () => {
            const meta = createTestingGeneratorMeta({ path: ['layers'] });
            const result = layersGenerator.generate(['base', 'components', 'utilities'], meta);
            expect(result).toEqual(['@layer base;', '@layer components;', '@layer utilities;']);
        });

        it('should generate css layer directive for single layer', () => {
            const meta = createTestingGeneratorMeta({ path: ['layers'] });
            const result = layersGenerator.generate(['base'], meta);
            expect(result).toEqual(['@layer base;']);
        });

        it('should not generate css layer directive for empty layers', () => {
            const meta = createTestingGeneratorMeta({ path: ['layers'] });
            const result = layersGenerator.generate([], meta);
            expect(result).toEqual([]);
        });
    });

    describe('match', () => {
        it.each([
            ['layers', true],
            ['layers.base', false],
            ['components.layers', false],
            ['other.layers.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, layersGenerator.key as string);
            expect(match).toBe(result);
        });
    });
});
