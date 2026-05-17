import { CSS, TokenType, TokenValue } from '../types';

export function css(strings: TemplateStringsArray, ...interpolations: TokenValue[]): CSS {
    const parts = strings.reduce<TokenValue[]>((acc, str, i) => {
        acc.push(str);

        if (i < interpolations.length) {
            acc.push(interpolations[i]);
        }

        return acc;
    }, []);

    return {
        __type: TokenType.CSS,
        __value: parts
    };
}
