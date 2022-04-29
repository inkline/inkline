import { Configuration, ThemeColor, UserConfiguration } from '../../types';
import color from 'color';
import { parseValue } from './parseValue';

export function parseColor (
    config: Configuration,
    value: UserConfiguration.Property.Color
): ThemeColor {
    // Color parser does not support strings with units inside of object initialization.
    // Normalize object value by converting strings to numbers and dividing alpha percentage value by 100
    if (typeof value === 'object') {
        const colorObject = value as Record<string, string | number>;
        const processedColorObject: Record<string, string | number> = {};

        Object.keys(colorObject).forEach((key) => {
            if (typeof colorObject[key] === 'string') {
                const isPercentage = (colorObject[key] as string).includes('%');
                const isFloat = (colorObject[key] as string).includes('.');

                colorObject[key] = isFloat
                    ? parseFloat(colorObject[key] as string)
                    : parseInt(colorObject[key] as string, 10);

                if (key === 'a' && isPercentage) {
                    colorObject[key] = (colorObject[key] as number) / 100;
                }
            }

            if (key === 'a') {
                processedColorObject.alpha = colorObject[key];
            } else {
                processedColorObject[key] = colorObject[key];
            }
        });

        value = processedColorObject as UserConfiguration.Property.Color;
    }

    const parsedValue = parseValue(config, value);
    const constructedColor = color(parsedValue);
    const hslColor = constructedColor.hsl().object() as ThemeColor;
    const alpha = constructedColor.alpha();

    return {
        h: hslColor.h,
        s: hslColor.s,
        l: hslColor.l,
        a: alpha
    };
}
