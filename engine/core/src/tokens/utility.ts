import { TokenType, Utility, DefinitionOptions } from '../types';
import { nanoid } from 'nanoid';
import { addUtilityToTheme, removeSelectorFromTheme } from '../side-effects';
import { isUtilityDefined } from '../utils';

/**
 * Creates a utility token.
 *
 * This token is used to define a utility CSS selector.
 * Utilities are used to store utility classes
 * Utilities automatically added to the theme when created.
 */
export function utility(
    name: string,
    value: Utility['__value'],
    options: DefinitionOptions
): Utility {
    const instance: Utility = {
        __type: TokenType.Utility,
        __name: name,
        __value: value
    };

    addUtilityToTheme(instance, options);
    removeSelectorFromTheme(value.__id, options);

    return instance;
}
