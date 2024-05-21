import {
    RawThemeTransition,
    RawThemeBorder,
    RawThemeBorderRadius,
    RawThemeBorderRadiusVariant,
    RawThemeBoxShadow,
    RawThemeBreakpoint,
    RawThemeColor,
    RawThemeColorVariant,
    RawThemeComponent,
    RawThemeScaleRatio,
    RawThemeSpacing,
    RawThemeSpacingWithSidesVariant,
    RawThemeSizePercentage,
    RawThemeSizeMultiplier,
    RawThemeSizeMultiplierVariant,
    ResolvedThemeTransition,
    ResolvedThemeBorder,
    ResolvedThemeBorderRadius,
    ResolvedThemeBoxShadow,
    ResolvedThemeBreakpoint,
    ResolvedThemeColor,
    ResolvedThemeComponent,
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
    ResolvedThemeSizePercentage,
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
    ResolvedThemeElement,
    RawThemeElement,
    RawThemeMargin,
    RawThemePadding,
    ResolvedThemePadding,
    ResolvedThemeMargin,
    RawThemeTypographyTextAlignment,
    ResolvedThemeTypographyTextAlignment,
    RawThemeLayers,
    ResolvedThemeLayers
} from '../types';

export type RawThemeVariantsWithOptionalDefault<
    DefaultVariant,
    VariantModifiers = DefaultVariant
> =
    | DefaultVariant
    | {
          default: DefaultVariant;
          [key: string]: DefaultVariant | VariantModifiers;
      };

export type RawThemeVariantsWithDefault<DefaultVariant, VariantModifiers = DefaultVariant> = {
    default: DefaultVariant;
    [key: string]: DefaultVariant | VariantModifiers;
};

export type ResolvedThemeVariantsWithDefault<DefaultVariant> = {
    default: DefaultVariant;
    [key: string]: DefaultVariant;
};

export interface RawTheme {
    boxShadow: RawThemeVariantsWithOptionalDefault<RawThemeBoxShadow>;
    border: RawThemeVariantsWithOptionalDefault<RawThemeBorder>;
    borderRadius: RawThemeVariantsWithOptionalDefault<
        RawThemeBorderRadius,
        RawThemeBorderRadiusVariant
    >;
    breakpoints: RawThemeVariantsWithOptionalDefault<RawThemeBreakpoint>;
    colors: Record<
        string,
        RawThemeVariantsWithOptionalDefault<RawThemeColor, RawThemeColorVariant>
    >;
    components: Record<ThemeComponentName, RawThemeVariantsWithOptionalDefault<RawThemeComponent>>;
    elements: Record<ThemeElementName, RawThemeVariantsWithOptionalDefault<RawThemeElement>>;
    grid: {
        columns: RawThemeGridColumns;
        gutter: RawThemeVariantsWithOptionalDefault<RawThemeGridGutter, RawThemeGridGutterVariant>;
        container: RawThemeVariantsWithOptionalDefault<RawThemeGridContainer>;
    };
    layers: RawThemeLayers;
    scaleRatios: RawThemeVariantsWithOptionalDefault<RawThemeScaleRatio>;
    size: {
        multiplier: RawThemeVariantsWithOptionalDefault<
            RawThemeSizeMultiplier,
            RawThemeSizeMultiplierVariant
        >;
        percentages: RawThemeVariantsWithOptionalDefault<RawThemeSizePercentage>;
    };
    spacing: RawThemeVariantsWithOptionalDefault<RawThemeSpacing, RawThemeSpacingWithSidesVariant>;
    margin: RawThemeVariantsWithOptionalDefault<RawThemeMargin, RawThemeSpacingWithSidesVariant>;
    padding: RawThemeVariantsWithOptionalDefault<RawThemePadding, RawThemeSpacingWithSidesVariant>;
    transition: RawThemeVariantsWithOptionalDefault<RawThemeTransition>;
    typography: {
        color: Record<string, RawThemeVariantsWithOptionalDefault<RawThemeTypographyColor>>;
        contrastColor: Record<
            string,
            RawThemeVariantsWithOptionalDefault<RawThemeTypographyContrastColor>
        >;
        fontFamily: RawThemeVariantsWithOptionalDefault<RawThemeTypographyFontFamily>;
        fontSize: RawThemeVariantsWithOptionalDefault<
            RawThemeTypographyFontSize,
            RawThemeTypographyFontSizeVariant
        >;
        fontWeight: RawThemeVariantsWithOptionalDefault<RawThemeTypographyFontWeight>;
        lineHeight: RawThemeVariantsWithOptionalDefault<RawThemeTypographyLineHeight>;
        letterSpacing: RawThemeVariantsWithOptionalDefault<RawThemeTypographyLetterSpacing>;
        textAlign: RawThemeVariantsWithOptionalDefault<RawThemeTypographyTextAlignment>;
    };
}

export interface ResolvedTheme {
    boxShadow: ResolvedThemeVariantsWithDefault<ResolvedThemeBoxShadow>;
    border: ResolvedThemeVariantsWithDefault<ResolvedThemeBorder>;
    borderRadius: ResolvedThemeVariantsWithDefault<ResolvedThemeBorderRadius>;
    breakpoints: ResolvedThemeVariantsWithDefault<ResolvedThemeBreakpoint>;
    colors: Record<string, ResolvedThemeVariantsWithDefault<ResolvedThemeColor>>;
    components: Record<
        ThemeComponentName,
        ResolvedThemeVariantsWithDefault<ResolvedThemeComponent>
    >;
    elements: Record<ThemeElementName, ResolvedThemeVariantsWithDefault<ResolvedThemeElement>>;
    grid: {
        columns: ResolvedThemeGridColumns;
        gutter: ResolvedThemeVariantsWithDefault<ResolvedThemeGridGutter>;
        container: ResolvedThemeVariantsWithDefault<ResolvedThemeGridContainer>;
    };
    layers: ResolvedThemeLayers;
    scaleRatios: ResolvedThemeVariantsWithDefault<ResolvedThemeScaleRatio>;
    size: {
        multiplier: ResolvedThemeVariantsWithDefault<ResolvedThemeSizeMultiplier>;
        percentages: ResolvedThemeVariantsWithDefault<ResolvedThemeSizePercentage>;
    };
    spacing: ResolvedThemeVariantsWithDefault<ResolvedThemeSpacing>;
    margin: ResolvedThemeVariantsWithDefault<ResolvedThemeMargin>;
    padding: ResolvedThemeVariantsWithDefault<ResolvedThemePadding>;
    transition: ResolvedThemeVariantsWithDefault<ResolvedThemeTransition>;
    typography: {
        color: Record<string, ResolvedThemeVariantsWithDefault<ResolvedThemeTypographyColor>>;
        contrastColor: Record<
            string,
            ResolvedThemeVariantsWithDefault<ResolvedThemeTypographyContrastColor>
        >;
        fontFamily: ResolvedThemeVariantsWithDefault<ResolvedThemeTypographyFontFamily>;
        fontSize: ResolvedThemeVariantsWithDefault<ResolvedThemeTypographyFontSize>;
        fontWeight: ResolvedThemeVariantsWithDefault<ResolvedThemeTypographyFontWeight>;
        lineHeight: ResolvedThemeVariantsWithDefault<ResolvedThemeTypographyLineHeight>;
        letterSpacing: ResolvedThemeVariantsWithDefault<ResolvedThemeTypographyLetterSpacing>;
        textAlign: ResolvedThemeVariantsWithDefault<ResolvedThemeTypographyTextAlignment>;
    };
}

export type RawThemeValueType<Value> =
    Value extends RawThemeVariantsWithOptionalDefault<infer DefaultVariant>
        ? DefaultVariant
        : Value extends RawThemeVariantsWithOptionalDefault<
                infer DefaultVariant,
                infer VariantModifiers
            >
          ? DefaultVariant | VariantModifiers
          : Value;

export type ResolvedThemeValueType<Value> =
    Value extends ResolvedThemeVariantsWithDefault<infer DefaultVariant> ? DefaultVariant : Value;
