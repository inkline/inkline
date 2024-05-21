export type SizeMultiplier = string | number;

export type SizePercentage = string | number;

export type RawThemeSizeMultiplier = SizeMultiplier;

export type RawThemeSizeMultiplierVariant = {
    add?: number | string;
    subtract?: number | string;
    multiply?: number | string;
    divide?: number | string;
    [key: string]: number | string | undefined;
};

export type ResolvedThemeSizeMultiplier = SizeMultiplier;

export type RawThemeSizePercentage = SizePercentage;

export type ResolvedThemeSizePercentage = SizePercentage;
