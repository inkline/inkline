import { breakpointsGenerator } from '../breakpoints';
import { ResolvedConfiguration, ResolvedTheme } from '../../types';

describe('generators', () => {
    describe('breakpoints', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'breakpoints';
                expect((breakpointsGenerator.test as RegExp).test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.breakpoints';
                expect((breakpointsGenerator.test as RegExp).test(path)).toEqual(true);
            });
        });

        describe('generator', () => {
            it('should generate variables for all breakpoints', () => {
                const config = {} as ResolvedConfiguration;
                const theme = {
                    breakpoints: {
                        xs: 0,
                        sm: 576,
                        md: 992
                    }
                } as unknown as ResolvedTheme;
                const value = theme.breakpoints;
                const path = ['breakpoints'];

                expect(breakpointsGenerator.apply({ config, theme, value, path })).toEqual([
                    '/**',
                    ' * Breakpoint variables',
                    ' */',
                    '@custom-media --breakpoint-xs-down (max-width: 575.99px);',
                    '@custom-media --breakpoint-xs (min-width: 0px) and (max-width: 575.99px);',
                    '@custom-media --breakpoint-sm-down (max-width: 991.99px);',
                    '@custom-media --breakpoint-sm-up (min-width: 576px);',
                    '@custom-media --breakpoint-sm (min-width: 576px) and (max-width: 991.99px);',
                    '@custom-media --breakpoint-md-up (min-width: 992px);',
                    '@custom-media --breakpoint-md (min-width: 992px);'
                ]);
            });
        });
    });
});
