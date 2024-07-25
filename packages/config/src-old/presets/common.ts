import { RawThemeColorVariant } from '../modules';

export const colorShadeVariants: Record<string, RawThemeColorVariant> = {
    'shade-150': { darken: 15 },
    'shade-100': { darken: 10 },
    'shade-50': { darken: 5 }
};

export const colorTintVariants: Record<string, RawThemeColorVariant> = {
    'tint-50': { lighten: 5 },
    'tint-100': { lighten: 10 },
    'tint-150': { lighten: 15 }
};

export const colorShadeAndTintVariants: Record<string, RawThemeColorVariant> = {
    ...colorShadeVariants,
    ...colorTintVariants
};

export const colorLightnessVariants: Record<string, RawThemeColorVariant> = {
    50: { lightness: 95 },
    100: { lightness: 90 },
    200: { lightness: 80 },
    300: { lightness: 70 },
    400: { lightness: 60 },
    500: { lightness: 50 },
    600: { lightness: 40 },
    700: { lightness: 30 },
    800: { lightness: 20 },
    900: { lightness: 10 }
};

export const sizeMultiplierVariants: Record<string, { multiply: string }> = {
    xs: { multiply: 'var(--size-multiplier-xs)' },
    sm: { multiply: 'var(--size-multiplier-sm)' },
    md: { multiply: 'var(--size-multiplier-md)' },
    lg: { multiply: 'var(--size-multiplier-lg)' },
    xl: { multiply: 'var(--size-multiplier-xl)' }
};

export const spacingVariants: Record<string, { divide?: number; multiply?: number }> = {
    ...sizeMultiplierVariants,
    '1-5': { divide: 5 },
    '1-4': { divide: 4 },
    '3-4': { divide: 4, multiply: 3 },
    '1-3': { divide: 3 },
    '2-3': { divide: 3, multiply: 2 },
    '1-2': { divide: 2 },
    2: { multiply: 2 },
    3: { multiply: 3 },
    4: { multiply: 4 },
    5: { multiply: 5 }
};
