export type SidesPropertyKey = 'top' | 'right' | 'bottom' | 'left';

export type CornersPropertyKey = 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft';

export type RawThemeGenericValue = string | number;

export type RawThemeGenericVariant = {
    add?: string | number;
    subtract?: string | number;
    multiply?: string | number;
    divide?: string | number;
    [key: string]: string | number | undefined;
};
