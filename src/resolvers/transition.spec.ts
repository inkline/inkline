import { transitionResolver, resolveTransition, resolveTransitionVariant } from './transition';
import { createTestingResolverMeta } from '../__tests__/utils';

describe('resolveTransition', () => {
    const meta = createTestingResolverMeta({ path: ['animation'] });

    it('should correctly resolve animation from string', () => {
        const input = '2s ease-in';
        const expected = { duration: '2s', timingFunction: 'ease-in' };
        const result = resolveTransition(input, meta);
        expect(result).toEqual(expected);
    });

    it('should correctly resolve animation from object', () => {
        const input = { duration: '3s', timingFunction: 'ease-out' };
        const expected = { duration: '3s', timingFunction: 'ease-out' };
        const result = resolveTransition(input, meta);
        expect(result).toEqual(expected);
    });
});

describe('resolveTransitionVariant', () => {
    const meta = createTestingResolverMeta({ path: ['animation'] });

    it('should correctly resolve animation variant from string', () => {
        const input = '2s ease-in';
        const expected = { duration: '2s', timingFunction: 'ease-in' };
        const result = resolveTransitionVariant(input, meta);
        expect(result).toEqual(expected);
    });

    it('should correctly resolve animation variant from object', () => {
        const input = { duration: '3s', timingFunction: 'ease-out' };
        const expected = { duration: '3s', timingFunction: 'ease-out' };
        const result = resolveTransitionVariant(input, meta);
        expect(result).toEqual(expected);
    });
});

describe('animationResolver', () => {
    const meta = createTestingResolverMeta({ path: ['animation'] });

    it('should correctly resolve animation without variants', () => {
        const input = '2s ease-in';
        const expected = {
            default: {
                duration: '2s',
                timingFunction: 'ease-in'
            }
        };

        const result = transitionResolver.resolve(input, meta);
        expect(result).toEqual(expected);
    });

    it('should correctly resolve animation with variants', () => {
        const input = {
            default: {
                duration: '2s',
                timingFunction: 'ease-in'
            },
            hover: '3s ease-out'
        };
        const expected = {
            default: {
                duration: '2s',
                timingFunction: 'ease-in'
            },
            hover: {
                duration: '3s',
                timingFunction: 'ease-out'
            }
        };

        const result = transitionResolver.resolve(input, meta);
        expect(result).toEqual(expected);
    });
});
