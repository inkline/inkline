import { TokenType, Variant, DefinitionOptions } from '../types';
import { nanoid } from 'nanoid';
import { addVariantToTheme } from './addToTheme';

/**
 * Creates a variant token.
 *
 * This token is used to define a variant rule.
 */
export function variant(
    name: string,
    value: Variant['__value'],
    options: DefinitionOptions
): Variant {
    const instance: Variant = {
        __id: nanoid(),
        __type: TokenType.Variant,
        __name: name,
        __value: value
    };

    addVariantToTheme(instance, options);

    return instance;
}
