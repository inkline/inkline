import { Calc, Reference, Selector, Theme, TokenType, Variable } from './types';

export function isToken<T>(value: unknown, type: TokenType): value is T {
    return (
        typeof value === 'object' && value !== null && '__type' in value && value.__type === type
    );
}

export function isVariable(value: unknown): value is Variable {
    return isToken(value, TokenType.Variable);
}

export function isRef(value: unknown): value is Reference {
    return isToken(value, TokenType.Reference);
}

export function isCalc(value: unknown): value is Calc {
    return isToken(value, TokenType.Calc);
}

export function isSelector(value: unknown): value is Selector {
    return isToken(value, TokenType.Selector);
}

export function isTheme(value: unknown): value is Theme {
    return isToken(value, TokenType.Theme);
}
