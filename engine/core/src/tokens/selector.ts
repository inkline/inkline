import { Selector, SelectorOptions, TokenType } from '../types';
import { nanoid } from 'nanoid';
import { addSelectorToTheme, removeSelectorFromTheme } from '../themes';
import { isAtRule, isSelector } from '../typeGuards';

/**
 * Creates a selector token.
 *
 * This token is used to define a CSS selector.
 * Selectors can be used to store component values.
 * Selectors automatically added to the theme when created.
 */
export function selector(
    name: string | string[],
    value: Selector['__value'],
    options: SelectorOptions
): Selector {
    const resolvedName = Array.isArray(name) ? name.join(', ') : name;
    const instance: Selector = {
        __id: nanoid(),
        __type: TokenType.Selector,
        __name: resolvedName,
        __value: value
    };

    addSelectorToTheme(instance, options);

    return instance;
}

/**
 * Sets a selector type as nested
 */
export function handleNestedSelector(instance: unknown, options: SelectorOptions) {
    if (!isSelector(instance) && !isAtRule(instance)) return;

    removeSelectorFromTheme(instance.__id, options);
}
