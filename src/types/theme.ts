import * as CSS from 'csstype';
import { Variants } from './variants';

export interface SidesProperty<T> {
    top: T;
    right: T;
    bottom: T;
    left: T;
    [key: string]: T;
}

export interface CornersProperty<T> {
    topLeft: T;
    topRight: T;
    bottomRight: T;
    bottomLeft: T;
    [key: string]: T;
}

export interface ThemeColor {
    h: number | string;
    s: number | string;
    l: number | string;
    a: CSS.Property.Opacity;
    [key: string]: number | string;
}

export interface ThemeBorder {
    width: CSS.Property.BorderWidth;
    style: CSS.Property.BorderStyle;
    color: CSS.Property.BorderColor;

    [key: string]: number | string & {};
}

export interface Theme {
    animation: {
        duration: CSS.Property.AnimationDuration;
        timingFunction: CSS.Property.AnimationTimingFunction;
        [key: string]: CSS.Property.AnimationDuration | CSS.Property.AnimationTimingFunction;
    };
    breakpoints: {
        [key: string]: number;
    };
    color: {
        [key: string]: ThemeColor;
    };
    margin: {
        top: CSS.Property.MarginTop;
        right: CSS.Property.MarginRight;
        bottom: CSS.Property.MarginBottom;
        left: CSS.Property.MarginLeft;
        [key: string]: CSS.Property.Margin;
    };
    padding: {
        top: CSS.Property.PaddingTop;
        right: CSS.Property.PaddingRight;
        bottom: CSS.Property.PaddingBottom;
        left: CSS.Property.PaddingLeft;
        [key: string]: CSS.Property.Padding;
    };
    border: {
        top: ThemeBorder;
        right: ThemeBorder;
        bottom: ThemeBorder;
        left: ThemeBorder;
        [key: string]: ThemeBorder;
    };
    boxShadow: {
        offsetX: string | number;
        offsetY: string | number;
        blurRadius: string | number;
        spreadRadius: string | number;
        color: CSS.Property.Color;
        [key: string]: string | number;
    };
    typography: {
        fontFamily: {
            primary: {
                base: CSS.Property.FontFamily;
                monospace: CSS.Property.FontFamily;
                print: CSS.Property.FontFamily;
            };
            secondary: {
                base: CSS.Property.FontFamily;
                monospace: CSS.Property.FontFamily;
                print: CSS.Property.FontFamily;
            };
        },
        fontWeight: {
            [key: string]: CSS.Property.FontWeight;
        };
        fontSize: CSS.Property.FontSize;
        lineHeight: CSS.Property.LineHeight;
        letterSpacing: CSS.Property.LetterSpacing;
        [key: string]: string | number | Record<string, any>;
    };
    scaleRatio: {
        primary: number;
        [key: string]: number;
    };
    sizes: {
        multiplier: string | number;
        percentages: Record<string, string>;
    },
    elements: {
        [key: string]: Theme;
    };
    components: {
        [key: string]: Theme;
    };
    variants: Variants;
    [key: string]: any;
}
