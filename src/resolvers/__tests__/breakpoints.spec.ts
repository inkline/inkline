import { breakpointsResolvers } from '../breakpoints';
import { Configuration, Theme } from '../../types';

const [
    breakpointsResolver
] = breakpointsResolvers();

describe('resolvers', () => {
    describe('breakpoints.[breakpoint]', () => {
        describe('test', () => {
            it('should match direct path', () => {
                const path = 'breakpoints.xs';
                expect(breakpointsResolver.test.test(path)).toEqual(true);
            });

            it('should match nested path', () => {
                const path = 'nested.breakpoints.xs';
                expect(breakpointsResolver.test.test(path)).toEqual(true);
            });
        });

        describe('set', () => {
            it('should replace direct path', () => {
                const path = 'breakpoints.xs';
                expect(path.replace(breakpointsResolver.test, breakpointsResolver.set as string)).toEqual('breakpoints.xs');
            });

            it('should replace nested path', () => {
                const path = 'nested.breakpoints.xs';
                expect(path.replace(breakpointsResolver.test, breakpointsResolver.set as string)).toEqual('nested.breakpoints.xs');
            });
        });

        describe('resolve', () => {
            it('should return value sides', () => {
                const config = {} as Configuration;
                const theme = {} as Theme;
                const value = 576;
                const path = ['breakpoints', 'xs'];

                expect(breakpointsResolver.resolve({ config, theme, value, path })).toEqual(value);
            });
        });
    });
});
