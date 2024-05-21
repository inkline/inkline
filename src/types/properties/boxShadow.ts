export type BoxShadow = {
    offsetX: string | number;
    offsetY: string | number;
    blurRadius: string;
    spreadRadius: string;
    color: string;
};

export type RawThemeBoxShadow = string | BoxShadow;

export type ResolvedThemeBoxShadow = BoxShadow;
