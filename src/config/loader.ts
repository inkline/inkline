import { Configuration, Generator, Parser, ParserContext, Token } from '../types';
import { applyParsers } from './apply';

export function loader (config: Configuration) {
    config.plugins.forEach((plugin) => {
        config.parsers.push(...plugin.parsers);
        config.generators.push(...plugin.generators);
    });

    const tokens = applyParsers(config, config);

    return tokens;
}
