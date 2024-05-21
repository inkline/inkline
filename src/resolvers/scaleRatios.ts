import {
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createResolveFn
} from '../utils';
import {
    RawTheme,
    RawThemeScaleRatio,
    RawThemeValueType,
    ResolvedTheme,
    ResolvedThemeScaleRatio,
    ResolvedThemeValueType
} from '../types';

export const resolveScaleRatio = defineResolverValueFn<RawThemeScaleRatio, ResolvedThemeScaleRatio>(
    (scaleRatio) => scaleRatio
);

export const resolveScaleRatioVariant = defineResolverVariantFn<
    RawThemeScaleRatio,
    ResolvedThemeScaleRatio
>(resolveScaleRatio);

export const scaleRatiosResolver = defineResolver<
    RawThemeValueType<RawTheme['scaleRatios']>,
    ResolvedThemeValueType<ResolvedTheme['scaleRatios']>
>({
    key: /^scaleRatios\.[^.]+$/,
    resolve: createResolveFn(resolveScaleRatio, resolveScaleRatioVariant)
});
