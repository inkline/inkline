import { createTestingClassifierMeta } from '../__tests__/utils';
import { ClassifierType } from '../types';
import { matchKey } from '../utils';
import { groupClassifier } from './group';

describe('classifiers', () => {
    describe('group', () => {
        it('should not classify string value as group', () => {
            const meta = createTestingClassifierMeta({ path: ['primitive'] });
            const value = 'value';
            const result = groupClassifier.classify(value, meta);

            expect(result).toEqual(value);
        });

        it('should classify object value as group', () => {
            const meta = createTestingClassifierMeta({ path: ['primitive'] });
            const value = { key: 'value' };
            const result = groupClassifier.classify(value, meta);

            expect(result).toEqual({
                $type: ClassifierType.Group,
                ...value
            });
        });

        describe('matcher', () => {
            it.each([
                ['colors', true],
                ['colors.red', false],
                ['colors.red.default', false],
                ['components', true],
                ['components.button', false],
                ['components.button.default', true],
                ['components.button.default.background', false],
                ['components.button.default.icon', true],
                ['components.button.default.icon.background', false],
                ['elements', true],
                ['elements.body', false],
                ['elements.body.default', true],
                ['elements.body.default.background', false],
                ['elements.body.default.icon', true],
                ['elements.body.default.icon.background', false],
                ['grid', true],
                ['size', true],
                ['typography', true],
                ['typography.color', true],
                ['typography.contrastColor', true]
            ])('should match path %s => %s', (path, result) => {
                const isAllowed = (groupClassifier.key as RegExp[]).some((pattern) =>
                    matchKey(path, pattern)
                );
                const isIgnored = (groupClassifier.ignore as RegExp[]).some((pattern) =>
                    matchKey(path, pattern)
                );

                expect(isAllowed && !isIgnored).toEqual(result);
            });
        });
    });
});
