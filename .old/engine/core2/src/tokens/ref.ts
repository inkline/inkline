import { Reference, TokenType, TokenValue, Variable } from '../types';

/**
 * Creates a reference token.
 *
 * This token is used to reference other variables.
 */
export function ref(value: string | Variable, fallback?: TokenValue): Reference {
    return {
        __type: TokenType.Reference,
        __name: typeof value === 'string' ? value : value.__name,
        ...(fallback ? { __fallback: fallback } : {})
    };
}

/**
 * Creates a value reference from a variable by using the variable's value.
 */
export function vref(value: Variable): Reference {
    return ref(value, value.__value);
}
