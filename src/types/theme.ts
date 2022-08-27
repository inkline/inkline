import {
    AnimationProperty,
    BorderProperty,
    BorderRadiusProperty, BorderRadiusPropertyVariant,
    BoxShadowProperty,
    BreakpointsProperty,
    ColorProperty, ColorPropertyVariant,
    FontFamilyProperty,
    FontSizeProperty,
    FontSizePropertyVariant,
    FontWeightProperty,
    LetterSpacingProperty,
    LineHeightProperty,
    MarginProperty,
    MarginPropertyVariant,
    PaddingProperty,
    ResolvedAnimationProperty,
    ResolvedBorderProperty, ResolvedBorderRadiusProperty,
    ResolvedBoxShadowProperty,
    ResolvedBreakpointsProperty,
    ResolvedColorProperty,
    ResolvedFontFamilyProperty,
    ResolvedFontSizeProperty,
    ResolvedFontWeightProperty,
    ResolvedLetterSpacingProperty,
    ResolvedLineHeightProperty,
    ResolvedMarginProperty,
    ResolvedPaddingProperty,
    ResolvedScaleRatioProperty,
    ResolvedSizeMultiplierProperty,
    ResolvedSizePercentagesProperty,
    ScaleRatioProperty,
    SizeMultiplierProperty,
    SizeMultiplierPropertyVariant,
    SizePercentagesProperty
} from './properties';
import { PartialDeep } from 'type-fest';

/**
 * Theme variants used to define properties with derived values.
 */
export interface ThemeVariants {
    borderRadius: Record<string, BorderRadiusPropertyVariant>;
    color: Record<string, Record<string, ColorPropertyVariant>>;
    margin: Record<string, MarginPropertyVariant>;
    padding: Record<string, MarginPropertyVariant>;
    size: {
        multiplier: Record<string, SizeMultiplierPropertyVariant>;
    }
    typography: {
        fontSize: Record<string, FontSizePropertyVariant>;
    };
}

/**
 * User provided theme, permissive, to allow for several formatting options.
 */
export interface Theme {
    animation: AnimationProperty;
    border: BorderProperty;
    borderRadius: BorderRadiusProperty;
    boxShadow: BoxShadowProperty;
    breakpoints: BreakpointsProperty;
    color: Record<string, ColorProperty>;
    margin: MarginProperty;
    padding: PaddingProperty;
    scaleRatio: ScaleRatioProperty;
    size: {
        multiplier: SizeMultiplierProperty;
        percentages: SizePercentagesProperty;
    },
    typography: {
        fontFamily: Record<string, FontFamilyProperty>;
        fontWeight: Record<string, FontWeightProperty>;
        fontSize: FontSizeProperty;
        lineHeight: LineHeightProperty;
        letterSpacing: LetterSpacingProperty;
        color: Record<string, ColorProperty>;
        contrastColor: Record<string, ColorProperty>;
    };
    variants: PartialDeep<ThemeVariants>;
}

/**
 * Resolved theme resulting after applying all resolvers.
 * This is the final shape of the theme, to be used in generators.
 */
export interface ResolvedTheme {
    animation: ResolvedAnimationProperty;
    border: ResolvedBorderProperty;
    borderRadius: ResolvedBorderRadiusProperty;
    boxShadow: ResolvedBoxShadowProperty;
    breakpoints: ResolvedBreakpointsProperty;
    color: Record<string, ResolvedColorProperty>;
    margin: ResolvedMarginProperty;
    padding: ResolvedPaddingProperty;
    scaleRatio: ResolvedScaleRatioProperty;
    size: {
        multiplier: ResolvedSizeMultiplierProperty;
        percentages: ResolvedSizePercentagesProperty;
    };
    typography: {
        fontFamily: Record<string, ResolvedFontFamilyProperty>;
        fontWeight: Record<string, ResolvedFontWeightProperty>;
        fontSize: ResolvedFontSizeProperty;
        lineHeight: ResolvedLineHeightProperty;
        letterSpacing: ResolvedLetterSpacingProperty;
        color: Record<string, ResolvedColorProperty>;
        contrastColor: Record<string, ResolvedColorProperty>;
    };
    variants: ThemeVariants;
}
