import type {
    Theme,
    Variable,
    TokenValue,
    PrimitiveTokenValue,
    Reference,
    CSS,
    TokenType,
    Selector,
    Utility,
    Variant
} from './types';

/**
 * Tokens
 */

export function isToken<T>(value: unknown, type: TokenType): value is T {
    return typeof value === 'object' && value !== null && 'type' in value && value.type === type;
}

export function isVariable<Name extends string = string>(value: unknown): value is Variable<Name> {
    return isToken(value, 'variable');
}

export function isRef<Name extends string = string>(value: unknown): value is Reference<Name> {
    return isToken(value, 'reference');
}

export function isSelector(value: unknown): value is Selector {
    return isToken(value, 'selector');
}

export function isUtility(value: unknown): value is Utility {
    return isToken(value, 'utility');
}

export function isVariant(value: unknown): value is Variant {
    return isToken(value, 'variant');
}

export function isCSS(value: unknown): value is CSS {
    return isToken(value, 'css');
}

export function isTheme(value: unknown): value is Theme {
    return isToken(value, 'theme');
}

export function isPrimitiveTokenValue(value: unknown): value is PrimitiveTokenValue {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        value === null
    );
}

export function isTokenValue(value: unknown): value is TokenValue {
    return (
        isVariable(value) || isRef(value) || isPrimitiveTokenValue(value) || Array.isArray(value)
    );
}
