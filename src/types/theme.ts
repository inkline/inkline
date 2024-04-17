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

export type RawThemeVariantsWithDefault<DefaultVariant, VariantModifiers = DefaultVariant> =
    | DefaultVariant
    | {
          default: DefaultVariant;
          [key: string]: DefaultVariant | VariantModifiers;
      };

export type ResolvedThemeVariantsWithDefault<DefaultVariant> = {
    default: DefaultVariant;
    [key: string]: DefaultVariant;
};

export interface RawTheme {
    boxShadow: RawThemeVariantsWithDefault<RawThemeBoxShadow>;
    border: RawThemeVariantsWithDefault<RawThemeBorder>;
    borderRadius: RawThemeVariantsWithDefault<RawThemeBorderRadius, RawThemeBorderRadiusVariant>;
    breakpoints: RawThemeVariantsWithDefault<RawThemeBreakpoint>;
    colors: Record<string, RawThemeVariantsWithDefault<RawThemeColor, RawThemeColorVariant>>;
    components: Record<ThemeComponentName, RawThemeVariantsWithDefault<RawThemeComponent>>;
    elements: Record<ThemeElementName, RawThemeVariantsWithDefault<RawThemeElement>>;
    grid: {
        columns: RawThemeGridColumns;
        gutter: RawThemeVariantsWithDefault<RawThemeGridGutter, RawThemeGridGutterVariant>;
        container: RawThemeVariantsWithDefault<RawThemeGridContainer>;
    };
    layers: RawThemeLayers;
    scaleRatios: RawThemeVariantsWithDefault<RawThemeScaleRatio>;
    size: {
        multiplier: RawThemeVariantsWithDefault<
            RawThemeSizeMultiplier,
            RawThemeSizeMultiplierVariant
        >;
        percentages: RawThemeVariantsWithDefault<RawThemeSizePercentage>;
    };
    spacing: RawThemeVariantsWithDefault<RawThemeSpacing, RawThemeSpacingWithSidesVariant>;
    margin: RawThemeVariantsWithDefault<RawThemeMargin, RawThemeSpacingWithSidesVariant>;
    padding: RawThemeVariantsWithDefault<RawThemePadding, RawThemeSpacingWithSidesVariant>;
    transition: RawThemeVariantsWithDefault<RawThemeTransition>;
    typography: {
        color: Record<string, RawThemeVariantsWithDefault<RawThemeTypographyColor>>;
        contrastColor: Record<string, RawThemeVariantsWithDefault<RawThemeTypographyContrastColor>>;
        fontFamily: RawThemeVariantsWithDefault<RawThemeTypographyFontFamily>;
        fontSize: RawThemeVariantsWithDefault<
            RawThemeTypographyFontSize,
            RawThemeTypographyFontSizeVariant
        >;
        fontWeight: RawThemeVariantsWithDefault<RawThemeTypographyFontWeight>;
        lineHeight: RawThemeVariantsWithDefault<RawThemeTypographyLineHeight>;
        letterSpacing: RawThemeVariantsWithDefault<RawThemeTypographyLetterSpacing>;
        textAlign: RawThemeTypographyTextAlignment;
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
        textAlign: ResolvedThemeTypographyTextAlignment;
    };
}
