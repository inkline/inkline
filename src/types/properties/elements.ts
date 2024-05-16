import type { RawThemeColor, ResolvedThemeColor } from './colors';
import type { RawThemeBorderRadius, ResolvedThemeBorderRadius } from './borderRadius';
import type { RawThemeBorder, ResolvedThemeBorder } from './border';
import type { RawThemeTypographyFontSize, ResolvedThemeTypographyFontSize } from './typography';
import type { RawThemeBoxShadow, ResolvedThemeBoxShadow } from './boxShadow';
import type {
    RawThemeMargin,
    RawThemePadding,
    RawThemeSpacing,
    ResolvedThemeMargin,
    ResolvedThemePadding,
    ResolvedThemeSpacing
} from './spacing';

export type ThemeElementName =
    | 'body'
    | 'code'
    | 'h1'
    | 'h2'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'd1'
    | 'd2'
    | 'd4'
    | 'd5'
    | 'd6'
    | string;

export type RawThemeElement = {
    background?: RawThemeColor;
    border?: RawThemeBorder;
    borderRadius?: RawThemeBorderRadius;
    boxShadow?: RawThemeBoxShadow;
    color?: RawThemeColor;
    fontSize?: RawThemeTypographyFontSize;
    margin?: RawThemeMargin;
    padding?: RawThemePadding;
    [key: string]: any;
};

export type ResolvedThemeElement = {
    background: ResolvedThemeColor;
    border: ResolvedThemeBorder;
    borderRadius: ResolvedThemeBorderRadius;
    boxShadow: ResolvedThemeBoxShadow;
    color: ResolvedThemeColor;
    fontSize: ResolvedThemeTypographyFontSize;
    margin: ResolvedThemeMargin;
    padding: ResolvedThemePadding;
    [key: string]: any;
};
