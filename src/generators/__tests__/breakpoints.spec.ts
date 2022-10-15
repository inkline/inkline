import { breakpointsMixinsGenerator } from '../breakpoints';
import { ResolvedConfiguration, ResolvedTheme } from '../../types';

describe('generators', () => {
    describe('breakpointsMixins', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'breakpoints';
                expect((breakpointsMixinsGenerator.test as RegExp).test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.breakpoints';
                expect((breakpointsMixinsGenerator.test as RegExp).test(path)).toEqual(true);
            });
        });

        describe('generator', () => {
            it('should generate variables for all breakpoints', () => {
                const config = {
                    buildOptions: {
                        extName: 'scss'
                    }
                } as unknown as ResolvedConfiguration;
                const theme = {
                    breakpoints: {
                        xs: 0,
                        sm: 576,
                        md: 992,
                        lg: 1200,
                        xl: 1600
                    },
                    elements: {
                        grid: {
                            columns: 12
                        }
                    }
                } as unknown as ResolvedTheme;
                const value = theme.breakpoints;
                const path = ['breakpoints'];

                expect(breakpointsMixinsGenerator.apply({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Breakpoint mixins',
                    ' */',
                    '@mixin breakpoint-xs-down { @media screen and (max-width: 575.99px) { @content; } }',
                    '@mixin breakpoint-xs-up { @content; }',
                    '@mixin breakpoint-xs { @media screen and (min-width: 0px) and (max-width: 575.99px) { @content; }}',
                    '@mixin breakpoint-sm-down { @media screen and (max-width: 991.99px) { @content; } }',
                    '@mixin breakpoint-sm-up { @media screen and (min-width: 576px) { @content; } }',
                    '@mixin breakpoint-sm { @media screen and (min-width: 576px) and (max-width: 991.99px) { @content; }}',
                    '@mixin breakpoint-md-down { @media screen and (max-width: 1199.99px) { @content; } }',
                    '@mixin breakpoint-md-up { @media screen and (min-width: 992px) { @content; } }',
                    '@mixin breakpoint-md { @media screen and (min-width: 992px) and (max-width: 1199.99px) { @content; }}',
                    '@mixin breakpoint-lg-down { @media screen and (max-width: 1599.99px) { @content; } }',
                    '@mixin breakpoint-lg-up { @media screen and (min-width: 1200px) { @content; } }',
                    '@mixin breakpoint-lg { @media screen and (min-width: 1200px) and (max-width: 1599.99px) { @content; }}',
                    '@mixin breakpoint-xl-down { @content; }',
                    '@mixin breakpoint-xl-up { @media screen and (min-width: 1600px) { @content; } }',
                    '@mixin breakpoint-xl { @media screen and (min-width: 1600px) { @content; }}',
                    '',
                    '$columns: 12 !default;',
                    "$breakpoint-keys: ('xs', 'sm', 'md', 'lg', 'xl') !default;",
                    '\n@mixin breakpoint-down($key) {\n' +
                    "    @if $key == 'xs' { @include breakpoint-xs-down { @content; } }\n" +
                    "    @else if $key == 'sm' { @include breakpoint-sm-down { @content; } }\n" +
                    "    @else if $key == 'md' { @include breakpoint-md-down { @content; } }\n" +
                    "    @else if $key == 'lg' { @include breakpoint-lg-down { @content; } }\n" +
                    "    @else if $key == 'xl' { @include breakpoint-xl-down { @content; } }\n" +
                    '    @else { @content; }\n' +
                    '}',
                    '\n@mixin breakpoint-up($key) {\n' +
                    "    @if $key == 'xs' { @include breakpoint-xs-up { @content; } }\n" +
                    "    @else if $key == 'sm' { @include breakpoint-sm-up { @content; } }\n" +
                    "    @else if $key == 'md' { @include breakpoint-md-up { @content; } }\n" +
                    "    @else if $key == 'lg' { @include breakpoint-lg-up { @content; } }\n" +
                    "    @else if $key == 'xl' { @include breakpoint-xl-up { @content; } }\n" +
                    '    @else { @content; }\n' +
                    '}',
                    '\n@mixin breakpoint($key) {\n' +
                    "    @if $key == 'xs' { @include breakpoint-xs { @content; } }\n" +
                    "    @else if $key == 'sm' { @include breakpoint-sm { @content; } }\n" +
                    "    @else if $key == 'md' { @include breakpoint-md { @content; } }\n" +
                    "    @else if $key == 'lg' { @include breakpoint-lg { @content; } }\n" +
                    "    @else if $key == 'xl' { @include breakpoint-xl { @content; } }\n" +
                    '    @else { @content; }\n' +
                    '}'
                ]);
            });
        });
    });
});
