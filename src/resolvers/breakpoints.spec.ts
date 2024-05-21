import { resolveBreakpoint, resolveBreakpointVariant, breakpointsResolver } from './breakpoints';
import { createTestingResolverMeta } from '../__tests__/utils';
import { matchKey } from '../utils';

describe('resolveBreakpoint', () => {
    const meta = createTestingResolverMeta({ path: ['breakpoints', 'default'] });

    it('should return the same breakpoint when breakpoint is a string', () => {
        const breakpoint = '768px';
        const result = resolveBreakpoint(breakpoint, meta);
        expect(result).toEqual(breakpoint);
    });

    it('should return the breakpoint with css variables when breakpoint is a variable', () => {
        const breakpoint = 'var(--breakpoint)';
        const result = resolveBreakpoint(breakpoint, meta);
        expect(result).toEqual(breakpoint);
    });
});

describe('resolveBreakpointVariant', () => {
    const meta = createTestingResolverMeta({ path: ['breakpoints', 'variant'] });

    it('should return the same breakpoint when variant is a string', () => {
        const variant = '1024px';
        const result = resolveBreakpointVariant(variant, meta);
        expect(result).toEqual(variant);
    });

    it('should return the breakpoint with css variables when variant is a variable', () => {
        const variant = 'var(--breakpoint-variant)';
        const result = resolveBreakpointVariant(variant, meta);
        expect(result).toEqual(variant);
    });
});

describe('breakpointsResolver', () => {
    describe('match', () => {
        it.each([
            ['breakpoints.xs', true],
            ['components.button.default.breakpoints', false],
            ['other.breakpoints.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, breakpointsResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});
