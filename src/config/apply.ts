import {Configuration, GroupToken, ParserContext, Token, ValueToken} from '../types';
import { getValueByPath } from '../helpers';

/**
 * Apply all parsers from configuration to given config object
 *
 * @param config
 * @param target
 * @param targetPath
 */
export function applyParsers (config: Configuration, target: Record<string, any>, targetPath: string[] = []): Array<GroupToken | ValueToken | Token> {
    const reservedKeys = ['plugins', 'parsers', 'generators'];
    const tokens: Array<GroupToken | ValueToken | Token> = [];

    Object.keys(target).forEach((key) => {
        if (reservedKeys.includes(key)) {
            return;
        }

        const path = [...targetPath, key].join('.');
        const context: ParserContext = {
            config,
            path,
            value: getValueByPath(config, path)
        };

        config.parsers.forEach((parser) => {
            if (!parser.test(context)) {
                return;
            }

            const returnedTokens = parser.resolve(context);
            if (returnedTokens) {
                tokens.push(...returnedTokens);
            }
        });
    });

    return tokens;
}
