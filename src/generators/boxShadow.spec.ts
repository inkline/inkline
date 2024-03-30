import { boxShadowGenerator } from './boxShadow';
import { ResolvedTheme } from '../types';
import { createTestingGeneratorMeta } from '../__tests__/utils';

describe('boxShadowGenerator', () => {
    const meta = createTestingGeneratorMeta({ path: ['boxShadow'] });

    it('should correctly generate boxShadow fields with variants', () => {
        const input: ResolvedTheme['boxShadow'] = {
            default: {
                offsetX: '2px',
                offsetY: '2px',
                blurRadius: '5px',
                spreadRadius: '0px',
                color: '#000'
            },
            large: {
                offsetX: '4px',
                offsetY: '4px',
                blurRadius: '10px',
                spreadRadius: '0px',
                color: '#000'
            }
        };
        const expected = [
            '--box-shadow-offset-x: 2px',
            '--box-shadow-offset-y: 2px',
            '--box-shadow-blur-radius: 5px',
            '--box-shadow-spread-radius: 0px',
            '--box-shadow-color: #000',
            '--box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y) var(--box-shadow-blur-radius) var(--box-shadow-spread-radius) var(--box-shadow-color)',
            '--box-shadow-offset-x-large: 4px',
            '--box-shadow-offset-y-large: 4px',
            '--box-shadow-blur-radius-large: 10px',
            '--box-shadow-spread-radius-large: 0px',
            '--box-shadow-color-large: #000',
            '--box-shadow-large: var(--box-shadow-offset-x-large) var(--box-shadow-offset-y-large) var(--box-shadow-blur-radius-large) var(--box-shadow-spread-radius-large) var(--box-shadow-color-large)'
        ];
        const result = boxShadowGenerator.generate(input, meta);

        expect(result).toEqual(expected);
    });
});
