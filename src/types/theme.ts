/**
 * Spacing variable type
 */
export type BorderElements = { width: string | number; style: string; color: string };
export type Border = string | BorderElements | {
    top: string | BorderElements;
    right: string | BorderElements;
    bottom: string | BorderElements;
    left: string | BorderElements;
}

/**
 * Spacing variable type
 */
export type Spacing = string | string[] | number | number[] | {
    top: string | number;
    right: string | number;
    bottom: string | number;
    left: string | number;
}

/**
 * Theme interface
 */
export interface Theme extends Record<string, any> {
    margin: Spacing;
    padding: Spacing;
    border: Border;
}
