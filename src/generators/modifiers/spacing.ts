import { NumberVariant, Theme } from '../../types';
import { sidesPropertyKeys } from '../../constants';
import { numberModifierAliases, numberModifiers } from './number';

export const applySpacingSideModifiers = (variable: Record<string, string>, key: string, modifiers: Record<string, string>) => {
    Object.keys(modifiers).forEach((modifier) => {
        (numberModifiers[modifier] || numberModifiers[numberModifierAliases[modifier]])(variable, 'top', modifiers[modifier]);
    });
};

/**
 * Modifiers that can be applied to color values in order to produce a new variant
 *
 * @param color
 * @param value
 */
export const spacingModifiers: {
    [key: string]: (margin: Theme['margin'], value: string | number | boolean | undefined) => void;
} = {
    top: (variable, value) => {
        if (typeof value === 'object') {
            applySpacingSideModifiers(variable as Record<string, string>, 'top', value);
        } else {
            variable.top = value as string;
        }
    },
    right: (variable, value) => {
        if (typeof value === 'object') {
            applySpacingSideModifiers(variable as Record<string, string>, 'right', value);
        } else {
            variable.right = value as string;
        }
    },
    bottom: (variable, value) => {
        if (typeof value === 'object') {
            applySpacingSideModifiers(variable as Record<string, string>, 'bottom', value);
        } else {
            variable.bottom = value as string;
        }
    },
    left: (variable, value) => {
        if (typeof value === 'object') {
            applySpacingSideModifiers(variable as Record<string, string>, 'left', value);
        } else {
            variable.left = value as string;
        }
    },
    add: (variable, value) => {
        sidesPropertyKeys.forEach((key) => {
            numberModifiers.add(variable as Record<string, string>, key, value);
        });
    },
    subtract: (variable, value) => {
        sidesPropertyKeys.forEach((key) => {
            numberModifiers.subtract(variable as Record<string, string>, key, value);
        });
    },
    multiply: (variable, value) => {
        sidesPropertyKeys.forEach((key) => {
            numberModifiers.multiply(variable as Record<string, string>, key, value);
        });
    },
    divide: (variable, value) => {
        sidesPropertyKeys.forEach((key) => {
            numberModifiers.divide(variable as Record<string, string>, key, value);
        });
    }
};

/**
 * Aliases that can be used for specific modifiers
 */
export const spacingModifierAliases: Record<string, string> = {
    t: 'top',
    r: 'right',
    b: 'bottom',
    l: 'left',
    ...numberModifierAliases
};
