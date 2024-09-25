import {
    RawThemeTransition,
    RawThemeBorder,
    RawThemeBorderRadius,
    RawThemeBorderRadiusVariant,
    RawThemeBoxShadow,
    RawThemeBreakpoint,
    RawThemeColor,
    RawThemeColorVariant,
    RawThemeScaleRatio,
    RawThemeSpacing,
    RawThemeSpacingWithSidesVariant,
    RawThemePercentage,
    RawThemeSizeMultiplier,
    RawThemeSizeMultiplierVariant,
    ResolvedThemeTransition,
    ResolvedThemeBorder,
    ResolvedThemeBorderRadius,
    ResolvedThemeBoxShadow,
    ResolvedThemeBreakpoint,
    ResolvedThemeColor,
    ResolvedThemeScaleRatio,
    ResolvedThemeSpacing,
    ResolvedThemeTypographyFontFamily,
    ResolvedThemeTypographyFontWeight,
    ResolvedThemeTypographyFontSize,
    ResolvedThemeTypographyLineHeight,
    ResolvedThemeTypographyLetterSpacing,
    ResolvedThemeTypographyColor,
    ResolvedThemeTypographyContrastColor,
    RawThemeTypographyContrastColor,
    RawThemeTypographyColor,
    RawThemeTypographyLetterSpacing,
    RawThemeTypographyLineHeight,
    RawThemeTypographyFontSize,
    RawThemeTypographyFontWeight,
    RawThemeTypographyFontFamily,
    RawThemeTypographyFontSizeVariant,
    ResolvedThemePercentage,
    ResolvedThemeSizeMultiplier,
    ThemeComponentName,
    RawThemeGridColumns,
    RawThemeGridGutter,
    RawThemeGridContainer,
    ResolvedThemeGridContainer,
    ResolvedThemeGridGutter,
    ResolvedThemeGridColumns,
    RawThemeGridGutterVariant,
    ThemeElementName,
    RawThemeMargin,
    RawThemePadding,
    ResolvedThemePadding,
    ResolvedThemeMargin,
    RawThemeTypographyTextAlignment,
    ResolvedThemeTypographyTextAlignment,
    RawThemeLayers,
    ResolvedThemeLayers,
    RawThemeMarginVariant,
    RawThemePaddingVariant,
    RawThemeAnimation,
    ResolvedThemeAnimation
} from '../modules';
import {
    MaybeThemeGroup,
    MaybeThemeVariable,
    RawThemeElement,
    ResolvedThemeElement,
    ThemeGroup,
    ThemeVariable
} from './classifier';

export type RawTheme = {
    animation: MaybeThemeVariable<RawThemeAnimation>;
    boxShadow: MaybeThemeVariable<RawThemeBoxShadow>;
    border: MaybeThemeVariable<RawThemeBorder>;
    borderRadius: MaybeThemeVariable<RawThemeBorderRadius, RawThemeBorderRadiusVariant>;
    breakpoints: MaybeThemeVariable<RawThemeBreakpoint>;
    colors: MaybeThemeGroup<
        Record<string, MaybeThemeVariable<RawThemeColor, RawThemeColorVariant>>
    >;
    components: MaybeThemeGroup<Record<ThemeComponentName, RawThemeElement>>;
    elements: MaybeThemeGroup<Record<ThemeElementName, RawThemeElement>>;
    grid: MaybeThemeGroup<{
        columns: MaybeThemeVariable<RawThemeGridColumns>;
        gutter: MaybeThemeVariable<RawThemeGridGutter, RawThemeGridGutterVariant>;
        container: MaybeThemeVariable<RawThemeGridContainer>;
    }>;
    layers: MaybeThemeVariable<RawThemeLayers>;
    scaleRatios: MaybeThemeVariable<RawThemeScaleRatio>;
    sizeMultiplier: MaybeThemeVariable<RawThemeSizeMultiplier, RawThemeSizeMultiplierVariant>;
    percentages: MaybeThemeVariable<RawThemePercentage>;
    spacing: MaybeThemeVariable<RawThemeSpacing, RawThemeSpacingWithSidesVariant>;
    margin: MaybeThemeVariable<RawThemeMargin, RawThemeMarginVariant>;
    padding: MaybeThemeVariable<RawThemePadding, RawThemePaddingVariant>;
    transition: MaybeThemeVariable<RawThemeTransition>;
    textColor: MaybeThemeVariable<RawThemeTypographyColor>;
    contrastTextColor: MaybeThemeVariable<RawThemeTypographyContrastColor>;
    fontFamily: MaybeThemeVariable<RawThemeTypographyFontFamily>;
    fontSize: MaybeThemeVariable<RawThemeTypographyFontSize, RawThemeTypographyFontSizeVariant>;
    fontWeight: MaybeThemeVariable<RawThemeTypographyFontWeight>;
    lineHeight: MaybeThemeVariable<RawThemeTypographyLineHeight>;
    letterSpacing: MaybeThemeVariable<RawThemeTypographyLetterSpacing>;
    textAlign: MaybeThemeVariable<RawThemeTypographyTextAlignment>;
    [key: string]: any;
};

export type ResolvedTheme = {
    animation: ThemeVariable<ResolvedThemeAnimation>;
    boxShadow: ThemeVariable<ResolvedThemeBoxShadow>;
    border: ThemeVariable<ResolvedThemeBorder>;
    borderRadius: ThemeVariable<ResolvedThemeBorderRadius>;
    breakpoints: ThemeVariable<ResolvedThemeBreakpoint>;
    colors: ThemeGroup<Record<string, ThemeVariable<ResolvedThemeColor>>>;
    components: ThemeGroup<Record<ThemeComponentName, ResolvedThemeElement>>;
    elements: ThemeGroup<Record<ThemeElementName, ResolvedThemeElement>>;
    grid: ThemeGroup<{
        columns: ThemeVariable<ResolvedThemeGridColumns>;
        gutter: ThemeVariable<ResolvedThemeGridGutter>;
        container: ThemeVariable<ResolvedThemeGridContainer>;
    }>;
    layers: ResolvedThemeLayers;
    scaleRatios: ThemeVariable<ResolvedThemeScaleRatio>;
    sizeMultiplier: ThemeVariable<ResolvedThemeSizeMultiplier>;
    percentages: ThemeVariable<ResolvedThemePercentage>;
    spacing: ThemeVariable<ResolvedThemeSpacing>;
    margin: ThemeVariable<ResolvedThemeMargin>;
    padding: ThemeVariable<ResolvedThemePadding>;
    transition: ThemeVariable<ResolvedThemeTransition>;
    textColor: ThemeVariable<ResolvedThemeTypographyColor>;
    contrastTextColor: ThemeVariable<ResolvedThemeTypographyContrastColor>;
    fontFamily: ThemeVariable<ResolvedThemeTypographyFontFamily>;
    fontSize: ThemeVariable<ResolvedThemeTypographyFontSize>;
    fontWeight: ThemeVariable<ResolvedThemeTypographyFontWeight>;
    lineHeight: ThemeVariable<ResolvedThemeTypographyLineHeight>;
    letterSpacing: ThemeVariable<ResolvedThemeTypographyLetterSpacing>;
    textAlign: ThemeVariable<ResolvedThemeTypographyTextAlignment>;
    [key: string]: any;
};

export type RawThemeValueType<Value> =
    Value extends ThemeVariable<infer DefaultVariant>
        ? DefaultVariant
        : Value extends ThemeVariable<infer DefaultVariant, infer VariantModifiers>
          ? DefaultVariant | VariantModifiers
          : Value;

export type ResolvedThemeValueType<Value> =
    Value extends ThemeVariable<infer DefaultVariant> ? DefaultVariant : Value;
