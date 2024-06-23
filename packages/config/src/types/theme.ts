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
    ResolvedThemeElementDefinition,
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
    RawThemeElementDefinition
} from '../modules';
import { ThemeElement, ThemeGroup, ThemeVariable } from './classifier';

export type RawTheme = {
    boxShadow: ThemeVariable<RawThemeBoxShadow>;
    border: ThemeVariable<RawThemeBorder>;
    borderRadius: ThemeVariable<RawThemeBorderRadius, RawThemeBorderRadiusVariant>;
    breakpoints: ThemeVariable<RawThemeBreakpoint>;
    colors: ThemeGroup<Record<string, ThemeVariable<RawThemeColor, RawThemeColorVariant>>>;
    components: ThemeGroup<Record<ThemeComponentName, ThemeElement>>;
    elements: ThemeGroup<Record<ThemeElementName, ThemeElement>>;
    grid: ThemeGroup<{
        columns: ThemeVariable<RawThemeGridColumns>;
        gutter: ThemeVariable<RawThemeGridGutter, RawThemeGridGutterVariant>;
        container: ThemeVariable<RawThemeGridContainer>;
    }>;
    layers: ThemeVariable<RawThemeLayers>;
    scaleRatios: ThemeVariable<RawThemeScaleRatio>;
    sizeMultiplier: ThemeVariable<RawThemeSizeMultiplier, RawThemeSizeMultiplierVariant>;
    percentages: ThemeVariable<RawThemePercentage>;
    spacing: ThemeVariable<RawThemeSpacing, RawThemeSpacingWithSidesVariant>;
    margin: ThemeVariable<RawThemeMargin, RawThemeMarginVariant>;
    padding: ThemeVariable<RawThemePadding, RawThemePaddingVariant>;
    transition: ThemeVariable<RawThemeTransition>;
    textColor: ThemeVariable<RawThemeTypographyColor>;
    textContrastColor: ThemeVariable<RawThemeTypographyContrastColor>;
    fontFamily: ThemeVariable<RawThemeTypographyFontFamily>;
    fontSize: ThemeVariable<RawThemeTypographyFontSize, RawThemeTypographyFontSizeVariant>;
    fontWeight: ThemeVariable<RawThemeTypographyFontWeight>;
    lineHeight: ThemeVariable<RawThemeTypographyLineHeight>;
    letterSpacing: ThemeVariable<RawThemeTypographyLetterSpacing>;
    textAlign: ThemeVariable<RawThemeTypographyTextAlignment>;
    [key: string]: any;
};

export type ResolvedTheme = {
    boxShadow: ThemeVariable<ResolvedThemeBoxShadow>;
    border: ThemeVariable<ResolvedThemeBorder>;
    borderRadius: ThemeVariable<ResolvedThemeBorderRadius>;
    breakpoints: ThemeVariable<ResolvedThemeBreakpoint>;
    colors: ThemeGroup<Record<string, ThemeVariable<ResolvedThemeColor>>>;
    components: ThemeGroup<
        Record<ThemeComponentName, ThemeVariable<ResolvedThemeElementDefinition>>
    >;
    elements: ThemeGroup<Record<ThemeElementName, ThemeVariable<ResolvedThemeElementDefinition>>>;
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
    textContrastColor: ThemeVariable<ResolvedThemeTypographyContrastColor>;
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
