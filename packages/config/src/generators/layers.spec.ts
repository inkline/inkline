import { layersGenerator } from './layers';
import { createTestingGeneratorMeta } from '../__tests__/utils';
import { matchKey } from '../utils';

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
