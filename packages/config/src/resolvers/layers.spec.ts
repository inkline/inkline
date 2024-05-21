import { layersResolver } from './layers';
import { createTestingResolverMeta } from '../__tests__/utils';
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
