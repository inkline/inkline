import {
    resolveBreakpoint,
    resolveBreakpointVariant,
    breakpointsResolver,
    breakpointsGenerator,
    generateBreakpoint,
    codegenBreakpoints
} from './breakpoints';
import { createTestingGeneratorMeta, createTestingResolverMeta } from '../__tests__/utils';
import { matchKey } from '../utils';

describe('codegenBreakpoints', () => {
    it('should generate down breakpoint', () => {
        const result = codegenBreakpoints.down('sm', '600px', false);
        expect(result).toEqual([
            '@mixin breakpoint-sm-down {',
            '@media screen and (max-width: 600px) { @content; }',
            '}'
        ]);
    });

    it('should generate up breakpoint', () => {
        const result = codegenBreakpoints.up('md', '768px', false);
        expect(result).toEqual([
            '@mixin breakpoint-md-up {',
            '@media screen and (min-width: 768px) { @content; }',
            '}'
        ]);
    });

    it('should generate match breakpoint', () => {
        const result = codegenBreakpoints.match('lg', '1024px', '1280px');
        expect(result).toEqual([
            '@mixin breakpoint-lg { @media screen and (min-width: 1024px) and (max-width: 1280px) { @content; }}'
        ]);
    });

    it('should generate list of breakpoints', () => {
        const result = codegenBreakpoints.list(['sm', 'md', 'lg']);
        expect(result).toEqual([`$breakpoint-keys: ('sm', 'md', 'lg') !default;`]);
    });

    it('should aggregate breakpoints', () => {
        const result = codegenBreakpoints.aggregate('up', ['sm', 'md', 'lg']);
        expect(result).toEqual([
            '@mixin breakpoint-up($key) {',
            `@if $key == 'sm' { @include breakpoint-sm-up { @content; } }`,
            `@else if $key == 'md' { @include breakpoint-md-up { @content; } }`,
            `@else if $key == 'lg' { @include breakpoint-lg-up { @content; } }`,
            '@else { @content; }',
            '}'
        ]);
    });
});

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
