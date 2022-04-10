/**
 * Property value as a function, allowing you to access the theme within other values
 */

export interface PropertyFn<T> {
    (context: { theme: Theme }): T;
}

/**
 * Generic variable type
 */

export interface SidesPropertyParts<T> extends Record<string, T | undefined> {
    default?: T;
    top?: T;
    right?: T;
    bottom?: T;
    left?: T;
}

export interface CornersPropertyParts<T> extends Record<string, T | undefined> {
    default?: T;
    topLeft?: T;
    topRight?: T;
    bottomRight?: T;
    bottomLeft?: T;
}

/**
 * Border variable type
 */

export interface BorderPropertyParts {
    width: string | number;
    style: string;
    color: string
}

export type BorderProperty = string | BorderPropertyParts | SidesPropertyParts<string | BorderPropertyParts> | PropertyFn<BorderProperty>;

/**
 * Spacing variable type
 */

export type SpacingProperty = string | string[] | number | number[] | SidesPropertyParts<string | number> | PropertyFn<SpacingProperty>;

/**
 * Theme interface
 */

export type ThemeValue = SpacingProperty | BorderProperty | string | number;

export interface Theme extends Record<string, ThemeValue> {
    margin: SpacingProperty;
    padding: SpacingProperty;
    border: BorderProperty;
}
