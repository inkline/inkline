import {
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createFieldWithOptionalVariantsResolveFn
} from '../utils';
import { RawTheme, RawThemeBreakpoint, ResolvedTheme, ResolvedThemeBreakpoint } from '../types';

export const resolveBreakpoint = defineResolverValueFn<RawThemeBreakpoint, ResolvedThemeBreakpoint>(
    (breakpoint) => breakpoint
);

export const resolveBreakpointVariant = defineResolverVariantFn<
    RawThemeBreakpoint,
    ResolvedThemeBreakpoint
>(resolveBreakpoint);

export const breakpointsResolver = defineResolver<
    RawTheme['breakpoints'],
    ResolvedTheme['breakpoints']
>({
    key: 'breakpoints',
    resolve: createFieldWithOptionalVariantsResolveFn(resolveBreakpoint, resolveBreakpointVariant)
});
