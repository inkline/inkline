import { cornersPropertyKeys } from '../../constants';
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
 * Create a new modifier that applies a number modifier to all corners
 *
 * @param method
 */
const createApplyModifier = (method: string) => (variable: Record<string, string>, value: string | number | boolean | undefined) => {
    cornersPropertyKeys.forEach((key) => {
        numberModifiers[method](variable as Record<string, string>, key, value);
    });
};

/**
 * Modifiers that can be applied to color values in order to produce a new variant
 *
 * @param color
 * @param value
 */
export const cornersModifiers: {
    [key: string]: ReturnType<typeof createSetModifier | typeof createApplyModifier>;
} = {
    topLeft: createSetModifier('topLeft'),
    topRight: createSetModifier('topRight'),
    bottomRight: createSetModifier('bottomRight'),
    bottomLeft: createSetModifier('bottomLeft'),
    add: createApplyModifier('add'),
    subtract: createApplyModifier('subtract'),
    multiply: createApplyModifier('multiply'),
    divide: createApplyModifier('divide')
};

/**
 * Aliases that can be used for specific modifiers
 */
export const cornersModifierAliases: Record<string, string> = {
    tl: 'topLeft',
    tr: 'topRight',
    br: 'bottomRight',
    bl: 'bottomLeft',
    ...numberModifierAliases
};
