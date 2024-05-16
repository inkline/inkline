import { generateBreakpoint, breakpointsGenerator } from './breakpoints';
import { createTestingGeneratorMeta } from '../__tests__/utils';
import { matchKey } from '../utils';

describe('generateBreakpoint', () => {
    it('should not generate breakpoint css variables for default variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['breakpoints', 'default'] });
        const breakpoint = '';
        const result = generateBreakpoint(breakpoint, meta);
        expect(result).toEqual([]);
    });

    it('should generate breakpoint css variables when breakpoint is a string', () => {
        const meta = createTestingGeneratorMeta({ path: ['breakpoints', 'xs'] });
        const breakpoint = '768px';
        const result = generateBreakpoint(breakpoint, meta);
        expect(result).toEqual(['--breakpoint-xs: 768px;']);
    });

    it('should generate breakpoint css variables when breakpoint is a number', () => {
        const meta = createTestingGeneratorMeta({ path: ['breakpoints', 'xs'] });
        const breakpoint = 768;
        const result = generateBreakpoint(breakpoint, meta);
        expect(result).toEqual(['--breakpoint-xs: 768px;']);
    });
});

describe('breakpointsGenerator', () => {
    describe('match', () => {
        it.each([
            ['breakpoints', false],
            ['breakpoints.xs', true],
            ['breakpoints.xs.width', false],
            ['components.button.xs.breakpoints', false],
            ['other.breakpoints.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, breakpointsGenerator.key as RegExp);
            expect(match).toBe(result);
        });
    });
});
