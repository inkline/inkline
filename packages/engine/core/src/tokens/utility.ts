import { TokenType, Utility, UtilityOptions } from '../types';
import { nanoid } from 'nanoid';
import { addUtilityToTheme, removeSelectorFromTheme } from '../themes';

/**
 * Creates a utility token.
 *
 * This token is used to define a utility CSS selector.
 * Utilities are used to store utility classes
 * Utilities automatically added to the theme when created.
 */
export function utility(name: string, value: Utility['__value'], options: UtilityOptions): Utility {
    const instance: Utility = {
        __id: nanoid(),
        __type: TokenType.Utility,
        __name: name,
        __value: value
    };

    addUtilityToTheme(instance, options);
    removeSelectorFromTheme(value.__id, options);

    return instance;
}
