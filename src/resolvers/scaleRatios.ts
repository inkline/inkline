import {
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createFieldWithOptionalVariantsResolveFn
} from '../utils';
import { RawTheme, RawThemeScaleRatio, ResolvedTheme, ResolvedThemeScaleRatio } from '../types';

export const resolveScaleRatio = defineResolverValueFn<RawThemeScaleRatio, ResolvedThemeScaleRatio>(
    (scaleRatio) => scaleRatio
);

export const resolveScaleRatioVariant = defineResolverVariantFn<
    RawThemeScaleRatio,
    ResolvedThemeScaleRatio
>(resolveScaleRatio);

export const scaleRatiosResolver = defineResolver<
    RawTheme['scaleRatios'],
    ResolvedTheme['scaleRatios']
>({
    key: 'scaleRatios',
    resolve: createFieldWithOptionalVariantsResolveFn(resolveScaleRatio, resolveScaleRatioVariant)
});
