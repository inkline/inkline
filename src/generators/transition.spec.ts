import { animationGenerator } from './animation';
import { createTestingGeneratorMeta } from '../__tests__/utils';

describe('animationGenerator', () => {
    const meta = createTestingGeneratorMeta({ path: ['animation'] });

    it('should correctly generate animation fields with variants', () => {
        const input = {
            default: { duration: '1s', timingFunction: 'ease-in' },
            slow: { duration: '2s', timingFunction: 'ease-in-out' }
        };
        const expected = [
            '--animation-duration: 1s',
            '--animation-timing-function: ease-in',
            '--animation: var(--animation-duration) var(--animation-timing-function)',
            '--animation-duration-slow: 2s',
            '--animation-timing-function-slow: ease-in-out',
            '--animation-slow: var(--animation-duration-slow) var(--animation-timing-function-slow)'
        ];
        const result = animationGenerator.generate(input, meta);

        expect(result).toEqual(expected);
    });
});
