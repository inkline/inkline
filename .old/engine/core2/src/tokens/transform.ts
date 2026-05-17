import { TokenType, TokenValue, Transform } from '../types';
import { isVariable } from '../typeGuards';
import { ref } from './ref';

/**
 * Creates a `transform` token.
 * This is a special token that allows you to perform transform operations
 */
export function transform(name: Transform['__name'], ...args: TokenValue[]): Transform {
    return {
        __type: TokenType.Transform,
        __name: name,
        __value: args.map((arg) => (isVariable(arg) ? ref(arg) : arg))
    };
}
