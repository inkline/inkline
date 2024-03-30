import { assignSpacingSides, resolveSpacingVariant } from './spacing';
import { resolvers } from '../defaults';
import { createTestingResolverMeta } from '../__tests__/utils';

describe('assignSpacing()', () => {
    it('should correctly assign the same padding to all sides when one value is provided', () => {
        const result = assignSpacingSides('10px');
        expect(result).toEqual({
            top: '10px',
            right: '10px',
            bottom: '10px',
            left: '10px'
        });
    });

    it('should correctly assign padding to sides when two values are provided', () => {
        const result = assignSpacingSides('10px 20px');
        expect(result).toEqual({
            top: '10px',
            right: '20px',
            bottom: '10px',
            left: '20px'
        });
    });

    it('should correctly assign padding to sides when three values are provided', () => {
        const result = assignSpacingSides('10px 20px 30px');
        expect(result).toEqual({
            top: '10px',
            right: '20px',
            bottom: '30px',
            left: '20px'
        });
    });

    it('should correctly assign padding to sides when four values are provided', () => {
        const result = assignSpacingSides('10px 20px 30px 40px');
        expect(result).toEqual({
            top: '10px',
            right: '20px',
            bottom: '30px',
            left: '40px'
        });
    });
});

describe('resolveSpacingVariant', () => {
    const meta = createTestingResolverMeta({ path: ['spacing', 'variantName'] });

    it('should correctly resolve spacing variant when object variant is provided', () => {
        const variant = {
            top: '10px',
            right: '20px',
            bottom: '30px',
            left: '40px'
        };

        expect(resolveSpacingVariant(variant, meta)).toEqual({
            top: '10px',
            right: '20px',
            bottom: '30px',
            left: '40px'
        });
    });

    it('should correctly resolve spacing variant when modifier is provided', () => {
        const meta = createTestingResolverMeta({ path: ['spacing', 'variantName'] });

        const variant = {
            add: '10px'
        };

        const result = resolveSpacingVariant(variant, meta);
        expect(result).toEqual({
            top: 'calc(var(--spacing-top) + 10px)',
            right: 'calc(var(--spacing-right) + 10px)',
            bottom: 'calc(var(--spacing-bottom) + 10px)',
            left: 'calc(var(--spacing-left) + 10px)'
        });
    });
});
