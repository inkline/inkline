import { createTestingGeneratorMeta } from '../__tests__/utils';
import { breakpointsGenerator, generateBreakpoint } from './breakpoints';

describe('breakpointsGenerator', () => {
    it('should generate correct breakpoint CSS variables for custom variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['breakpoints', 'custom'] });
        const breakpoint = '800px';

        const result = generateBreakpoint(breakpoint, meta);

        expect(result).toEqual(['--breakpoint-custom: 800px']);
    });

    it('should not generate breakpoint CSS variables for default variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['breakpoints', 'default'] });
        const breakpoint = '800px';

        const result = generateBreakpoint(breakpoint, meta);

        expect(result).toEqual([]);
    });

    it('should handle breakpoint as number correctly', () => {
        const meta = createTestingGeneratorMeta({ path: ['breakpoints', 'custom'] });
        const breakpoint = 800;

        const result = generateBreakpoint(breakpoint, meta);

        expect(result).toEqual(['--breakpoint-custom: 800px']);
    });
});

describe('breakpointsGenerator', () => {
    const meta = createTestingGeneratorMeta({ path: ['breakpoints'] });

    it('should correctly generate breakpoints fields with variants', () => {
        const input = {
            default: '',
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280
        };
        const result = breakpointsGenerator.generate(input, meta);

        expect(result).toEqual([
            '--breakpoint-xs: 0px',
            '--breakpoint-sm: 600px',
            '--breakpoint-md: 960px',
            '--breakpoint-lg: 1280px'
        ]);
    });
});
