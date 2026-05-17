import {
    AtRule,
    AtRules,
    AtRuleValue,
    ComponentValue,
    Selector,
    DefinitionOptions,
    TokenType
} from '../types';
import { nanoid } from 'nanoid';
import { addSelectorToTheme } from './addToTheme';
import { handleNestedSelector } from '../tokens';
import { selector } from './selector';

/**
 * Creates a media token
 *
 * This token is used to define a CSS media query.
 * Media queries can be used to store one or more selectors.
 * Media queries automatically get added to the theme when created.
 */
export function atRule(
    name: AtRules,
    identifier: string,
    value: AtRuleValue,
    options: DefinitionOptions
): AtRule {
    const instance: AtRule = {
        __id: nanoid(),
        __type: TokenType.AtRule,
        __name: name,
        __identifier: identifier,
        __value: value
    };

    if (Array.isArray(value)) {
        value.forEach((v) => handleNestedSelector(v, options));
    } else {
        handleNestedSelector(value, options);
    }

    addSelectorToTheme(instance, options);

    return instance;
}

/**
 * Creates a media token
 *
 * This token is used to define a CSS media query.
 * Media queries can be used to store one or more selectors.
 * Media queries automatically get added to the theme when created.
 */
export function media(
    identifier: string,
    value: Selector | Selector[],
    options: DefinitionOptions
) {
    return atRule('media', identifier, value, options);
}

/**
 * Creates a keyframes token.
 *
 * This token is used to define a CSS keyframes animation.
 * Keyframes can be used to store one or more keyframe selectors in key-value format.
 * Keyframes automatically get added to the theme when created.
 */
export function keyframes(
    identifier: string,
    value: Record<string, ComponentValue>,
    options: DefinitionOptions
) {
    const keyframesValue = Object.entries(value).map(([key, value]) =>
        selector(key, value, options)
    );
    return atRule('keyframes', identifier, keyframesValue, options);
}
