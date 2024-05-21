import { createTestingClassifierMeta } from '../__tests__/utils';
import { matchKey } from '../utils';
import { ignoreKeyClassifier } from './ignoreKey';

describe('classifiers', () => {
    describe('group', () => {
        it('should classify object value with ignored key', () => {
            const meta = createTestingClassifierMeta({ path: ['path'] });
            const value = { key: 'value' };
            const result = ignoreKeyClassifier.classify(value, meta);

            expect(result).toEqual({
                $ignoreKey: true,
                ...value
            });
        });

        describe('matcher', () => {
            it.each([
                ['border', false],
                ['components', true],
                ['components.button', false],
                ['elements', true],
                ['elements.body', false],
                ['typography', true],
                ['typography.color', false]
            ])('should match path %s => %s', (path, result) => {
                const isAllowed = (ignoreKeyClassifier.key as RegExp[]).some((pattern) =>
                    matchKey(path, pattern)
                );
                const isIgnored = ((ignoreKeyClassifier.ignore as RegExp[]) ?? []).some((pattern) =>
                    matchKey(path, pattern)
                );

                expect(isAllowed && !isIgnored).toEqual(result);
            });
        });
    });
});
