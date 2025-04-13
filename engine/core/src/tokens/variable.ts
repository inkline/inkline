import {
    NamespacedKey,
    NamespaceType,
    TokenType,
    TokenValue,
    Variable,
    VariableOptions,
    VariablesOptions
} from '../types';
import { addVariableToTheme } from '../themes';
import { isVariable } from '../typeGuards';
import { createNamespacedTokenName } from '../utils';

/**
 * Creates a variable token.
 *
 * This token is used to define a variable.
 * Variables can be used to store primitive values or references to other variables.
 * Variables automatically get added to the theme when created.
 * Using the variable function will override the stored value unless `options.default` is specified.
 */
export function variable<Name extends string = string>(
    name: Name,
    value: TokenValue,
    options: VariableOptions
): Variable<Name> {
    const instance: Variable<Name> = {
        __type: TokenType.Variable,
        __name: name,
        __value: value
    };

    if (options?.register !== false) {
        addVariableToTheme(instance, options);
    }

    return instance;
}

/**
 * Creates a namespaced variable token.
 *
 * This token is used to define a namespaced variable.
 * Namespaced variables are used to group related variables together.
 * Namespaced variables automatically get added to the theme when created.
 * Using the nsvariable function will override the stored value unless `options.default` is specified.
 */
export function nsvariable<Namespace extends NamespaceType, Name extends string>(
    ns: Namespace,
    nameOrInstance: Variable<Name> | Name,
    value: TokenValue,
    options: VariablesOptions
): Variable<NamespacedKey<Namespace, Name>> {
    const name = isVariable(nameOrInstance) ? nameOrInstance.__name : nameOrInstance;

    return variable(createNamespacedTokenName(ns, name), value, options);
}

/**
 * Sets a variable or reference value
 */
export function set<Name extends string>(instance: Variable<Name>, value: TokenValue) {
    instance.__value = value;
}

/**
 * Return the value of a variable or reference
 */
export function valueOf<Name extends string>(instance: Variable<Name>): TokenValue {
    return instance.__value;
}

/**
 * Returns the name of a variable
 */
export function nameOf<Name extends string>(instance: Variable<Name>): Name {
    return instance.__name;
}

/**
 * Returns the CSS name of a variable
 */
export function toVariableKey<Name extends string>(instance: Variable<Name>): string {
    return `--${instance.__name}`;
}
