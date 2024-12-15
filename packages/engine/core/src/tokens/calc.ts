import { Calc, TokenType, TokenValue } from '../types';
import { isVariable } from '../typeGuards';
import { ref } from './ref';
import { insertInBetweenElements } from '../utils';

/**
 * Creates a `calc` token.
 * This is a special token that allows you to perform math operations
 * on variable references and primitive values.
 */
export function calc(...args: TokenValue[]): Calc {
    return {
        __type: TokenType.Calc,
        __value: args.map((arg) => (isVariable(arg) ? ref(arg) : arg))
    };
}

export function multiply(...args: TokenValue[]): Calc {
    return calc(...insertInBetweenElements(args, '*'));
}

export function divide(...args: TokenValue[]): Calc {
    return calc(...insertInBetweenElements(args, '/'));
}

export function add(...args: TokenValue[]): Calc {
    return calc(...insertInBetweenElements(args, '+'));
}

export function subtract(...args: TokenValue[]): Calc {
    return calc(...insertInBetweenElements(args, '-'));
}
