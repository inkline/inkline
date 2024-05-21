import {
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createResolveFn
} from '../utils';
import {
    RawTheme,
    RawThemeBreakpoint,
    RawThemeValueType,
    ResolvedTheme,
    ResolvedThemeBreakpoint,
    ResolvedThemeValueType
} from '../types';

export const resolveBreakpoint = defineResolverValueFn<RawThemeBreakpoint, ResolvedThemeBreakpoint>(
    (breakpoint) => breakpoint
);

export const resolveBreakpointVariant = defineResolverVariantFn<
    RawThemeBreakpoint,
    ResolvedThemeBreakpoint
>(resolveBreakpoint);

export const breakpointsResolver = defineResolver<
    RawThemeValueType<RawTheme['breakpoints']>,
    ResolvedThemeValueType<ResolvedTheme['breakpoints']>
>({
    key: /^breakpoints\.[^.]+$/,
    resolve: createResolveFn(resolveBreakpoint, resolveBreakpointVariant)
});
