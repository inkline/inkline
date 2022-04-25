import * as CSS from 'csstype';

export interface SidesProperty<T> {
    top: T;
    right: T;
    bottom: T;
    left: T;
    [key: string]: T;
}

export interface ThemeColor {
    h: number;
    s: number;
    l: number;
    a: CSS.Property.Opacity;
    [key: string]: number | string;
}

export interface Theme {
    color: {
        [key: string]: ThemeColor
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
        top: {
            width: CSS.Property.BorderWidth;
            style: CSS.Property.BorderStyle;
            color: CSS.Property.BorderColor;
        };
        right: {
            width: CSS.Property.BorderWidth;
            style: CSS.Property.BorderStyle;
            color: CSS.Property.BorderColor;
        };
        bottom: {
            width: CSS.Property.BorderWidth;
            style: CSS.Property.BorderStyle;
            color: CSS.Property.BorderColor;
        };
        left: {
            width: CSS.Property.BorderWidth;
            style: CSS.Property.BorderStyle;
            color: CSS.Property.BorderColor;
        };
    };
    elements: {
        [key: string]: Theme;
    };
    components: {
        [key: string]: Theme;
    };
    [key: string]: any;
}
