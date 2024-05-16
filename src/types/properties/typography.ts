import { RawThemeColor, ResolvedThemeColor } from './colors';

export interface FontFamily {
    base: string;
    monospace: string;
    print: string;
}

export type RawThemeTypographyFontFamily = FontFamily;

export type RawThemeTypographyFontWeight = string | number;

export type RawThemeTypographyFontSize = string;

export type RawThemeTypographyFontSizeVariant = {
    multiply?: string | number;
    divide?: string | number;
    add?: string | number;
    subtract?: string | number;
    [key: string]: string | number | undefined;
};

export type RawThemeTypographyLineHeight = string | number;

export type RawThemeTypographyLetterSpacing = string | number;

export type RawThemeTypographyColor = RawThemeColor;

export type RawThemeTypographyContrastColor = RawThemeColor;

export type ResolvedThemeTypographyFontFamily = RawThemeTypographyFontFamily;

export type ResolvedThemeTypographyFontWeight = RawThemeTypographyFontWeight;

export type ResolvedThemeTypographyFontSize = RawThemeTypographyFontSize;

export type ResolvedThemeTypographyLineHeight = RawThemeTypographyLineHeight;

export type ResolvedThemeTypographyLetterSpacing = RawThemeTypographyLetterSpacing;

export type ResolvedThemeTypographyColor = ResolvedThemeColor;

export type ResolvedThemeTypographyContrastColor = ResolvedThemeColor;

export type RawThemeTypographyTextAlignment = 'left' | 'center' | 'right' | 'justify' | string;

export type ResolvedThemeTypographyTextAlignment = RawThemeTypographyTextAlignment;
