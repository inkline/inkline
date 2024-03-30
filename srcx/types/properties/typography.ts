import * as CSS from 'csstype';
import { NumberPropertyVariant } from './number';

export interface FontFamilyProperty {
    base: CSS.Property.FontFamily;
    monospace: CSS.Property.FontFamily;
    print: CSS.Property.FontFamily;
    [key: string]: CSS.Property.FontFamily;
}

export type ResolvedFontFamilyProperty = FontFamilyProperty;

export type FontWeightProperty = CSS.Property.FontWeight;

export type ResolvedFontWeightProperty = FontWeightProperty;

export type FontSizeProperty = CSS.Property.FontSize;

export type FontSizePropertyVariant = NumberPropertyVariant | FontSizeProperty;

export type ResolvedFontSizeProperty = FontSizeProperty;

export type LineHeightProperty = CSS.Property.LineHeight;

export type ResolvedLineHeightProperty = LineHeightProperty;

export type LetterSpacingProperty = CSS.Property.LetterSpacing;

export type ResolvedLetterSpacingProperty = LetterSpacingProperty;
