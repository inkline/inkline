import { sidesPropertyKeys } from '../../constants';
import { numberModifierAliases, numberModifiers } from './number';

/**
 * Create a new modifier that sets the value of a side
 *
 * @param key
 */
const createSetModifier = (key: string) => (variable: Record<string, string>, value: string | number | boolean | undefined) => {
    if (typeof value === 'object') {
        Object.keys(value).forEach((modifierName) => {
            const modifier = numberModifiers[modifierName] || numberModifiers[numberModifierAliases[modifierName]];

            modifier(variable, key, value[modifierName]);
        });
    } else {
        variable[key] = value as string;
    }
};

/**
 * Create a new modifier that applies a number modifier to all sides
 *
 * @param method
 */
const createApplyModifier = (method: string) => (variable: Record<string, string>, value: string | number | boolean | undefined) => {
    sidesPropertyKeys.forEach((key) => {
        numberModifiers[method](variable as Record<string, string>, key, value);
    });
};

/**
 * Modifiers that can be applied to color values in order to produce a new variant
 *
 * @param color
 * @param value
 */
export const sidesModifiers: {
    [key: string]: ReturnType<typeof createSetModifier | typeof createApplyModifier>;
} = {
    top: createSetModifier('top'),
    right: createSetModifier('right'),
    bottom: createSetModifier('bottom'),
    left: createSetModifier('left'),
    add: createApplyModifier('add'),
    subtract: createApplyModifier('subtract'),
    multiply: createApplyModifier('multiply'),
    divide: createApplyModifier('divide')
};

/**
 * Aliases that can be used for specific modifiers
 */
export const sidesModifierAliases: Record<string, string> = {
    t: 'top',
    r: 'right',
    b: 'bottom',
    l: 'left',
    ...numberModifierAliases
};
