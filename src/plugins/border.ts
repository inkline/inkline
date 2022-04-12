import { BorderProperty, Parser, Plugin, SidesPropertyParts, ValueToken } from '../types';
import {parseBorderValue, parseSidesValue} from '../helpers';

export const spacing: Plugin<{}, BorderProperty, ValueToken> = (options) => {
    const parser: Parser<BorderProperty, ValueToken> = {
        test: ({ path }) => /(border)$/.test(path),
        resolve ({ value, path, config }) {
            const border = parseBorderValue(config, value);

            // const sides = parseSidesValue(config, value);
            // const sidesVariables: ValueToken[] = sidesPropertyKeys.map((sideKey) => ({
            //     type: 'variable',
            //     name: `${property}-${sideKey}`,
            //     value: sides[sideKey]
            // }) as ValueToken);
            //
            // sidesVariables.push({
            //     type: 'variable',
            //     name: property,
            //     value: sidesPropertyKeys.map((sideKey) => ({
            //         type: 'variable',
            //         name: `${property}-${sideKey}`
            //     }))
            // });

            return border;
        }
    };

    return {
        parsers: [parser],
        generators: []
    };
};
