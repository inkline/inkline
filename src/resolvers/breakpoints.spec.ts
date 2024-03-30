import { resolveBreakpoint, resolveBreakpointVariant, breakpointsResolver } from './breakpoints';
import { createTestingResolverMeta } from '../__tests__/utils';

describe('resolveBreakpoint', () => {
    const meta = createTestingResolverMeta({ path: ['breakpoints', 'md'] });

    it('should return the same breakpoint value', () => {
        const input = '768px';
        const expected = '768px';

        const result = resolveBreakpoint(input, meta);
        expect(result).toBe(expected);
    });
});

describe('resolveBreakpointVariant', () => {
    const meta = createTestingResolverMeta({ path: ['breakpoints', 'md'] });

    it('should return the same breakpoint variant value', () => {
        const input = '1024px';
        const expected = '1024px';

        const result = resolveBreakpointVariant(input, meta);
        expect(result).toBe(expected);
    });
});

describe('breakpointsResolver', () => {
    const meta = createTestingResolverMeta({ path: ['breakpoints'] });

    it('should correctly resolve breakpoints with variants', () => {
        const input = {
            default: '',
            sm: '320px',
            md: '768px',
            lg: '1024px'
        };
        const expected = input;

        const result = breakpointsResolver.resolve(input, meta);
        expect(result).toEqual(expected);
    });
});
