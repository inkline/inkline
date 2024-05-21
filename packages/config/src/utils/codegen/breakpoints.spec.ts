import { codegenBreakpoints } from './breakpoints';

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
