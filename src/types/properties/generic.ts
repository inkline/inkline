export type RawThemeGenericValue = string | number;

export type RawThemeGenericVariant = {
    add?: string | number;
    subtract?: string | number;
    multiply?: string | number;
    divide?: string | number;
    [key: string]: string | number | undefined;
};
