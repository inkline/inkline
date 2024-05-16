import { entityVariantsClassifier, primitiveVariantsClassifier } from './variants';
import { createTestingClassifierMeta } from '../__tests__/utils';
import { ClassifierType } from '../types';
import { matchKey } from '../utils';

describe('classifiers', () => {
    describe('primitive variants', () => {
        it('should classify string value as primitive variants', () => {
            const meta = createTestingClassifierMeta({ path: ['primitive'] });
            const value = 'value';
            const result = primitiveVariantsClassifier.classify(value, meta);

            expect(result).toEqual({
                $type: ClassifierType.PrimitiveVariants,
                default: value
            });
        });

        it('should classify object value as primitive variants', () => {
            const meta = createTestingClassifierMeta({ path: ['primitive'] });
            const value = { key: 'value' };
            const result = primitiveVariantsClassifier.classify(value, meta);

            expect(result).toEqual({
                $type: ClassifierType.PrimitiveVariants,
                default: value
            });
        });

        it('should classify variants value as primitive variants', () => {
            const meta = createTestingClassifierMeta({ path: ['primitive'] });
            const value = { default: 'value', other: 'value' };
            const result = primitiveVariantsClassifier.classify(value, meta);

            expect(result).toEqual({
                $type: ClassifierType.PrimitiveVariants,
                ...value
            });
        });

        describe('matcher', () => {
            it.each([
                ['border', true],
                ['boxShadow', true],
                ['colors', false],
                ['colors.red', true],
                ['components', false],
                ['components.button', false],
                ['components.button.default', false],
                ['components.button.default.border', false],
                ['components.button.default.icon.border', false],
                ['elements', false],
                ['layers', false],
                ['grid', false],
                ['grid.gutter', true],
                ['size', false],
                ['size.multiplier', true],
                ['typography', false],
                ['typography.color', false],
                ['typography.color.red', true],
                ['typography.contrastColor', false],
                ['typography.contrastColor.red', true],
                ['typography.fontSize', true]
            ])('should match path %s => %s', (path, result) => {
                const isAllowed = (primitiveVariantsClassifier.key as RegExp[]).some((pattern) =>
                    matchKey(path, pattern)
                );
                const isIgnored = (primitiveVariantsClassifier.ignore as RegExp[]).some((pattern) =>
                    matchKey(path, pattern)
                );

                expect(isAllowed && !isIgnored).toEqual(result);
            });
        });
    });

    describe('entity variants', () => {
        it('should classify object value as entity variants', () => {
            const meta = createTestingClassifierMeta({ path: ['entity'] });
            const value = { fontSize: '1rem' };
            const result = entityVariantsClassifier.classify(value, meta);

            expect(result).toEqual({
                $type: ClassifierType.EntityVariants,
                default: value
            });
        });

        it('should classify variants value as entity variants', () => {
            const meta = createTestingClassifierMeta({ path: ['entity'] });
            const value = { default: { fontSize: '1rem' }, lg: { fontSize: '1.2rem' } };
            const result = entityVariantsClassifier.classify(value, meta);

            expect(result).toEqual({
                $type: ClassifierType.EntityVariants,
                ...value
            });
        });

        describe('matcher', () => {
            it.each([
                ['components', false],
                ['components.button', true],
                ['components.button.color', false],
                ['elements', false],
                ['elements.body', true],
                ['elements.body.color', false]
            ])('should match path %s => %s', (path, result) => {
                const isAllowed = (entityVariantsClassifier.key as RegExp[]).some((pattern) =>
                    matchKey(path, pattern)
                );
                const isIgnored = ((entityVariantsClassifier.ignore as RegExp[]) ?? []).some(
                    (pattern) => matchKey(path, pattern)
                );

                expect(isAllowed && !isIgnored).toEqual(result);
            });
        });
    });
});
