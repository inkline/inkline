import { Parser, Plugin, SpacingProperty, ValueToken } from '../types';
import { parseSidesValue } from '../helpers';
import { sidesPropertyKeys } from '../constants';

export const spacing: Plugin<{}, SpacingProperty, ValueToken> = (options) => {
    const parser: Parser<SpacingProperty, ValueToken> = {
        test: ({ path }) => /(margin|padding)$/.test(path),
        resolve ({ value, path, config }) {
            const property = path.match(/(margin|padding)$/)?.[1];
            if (!property) {
                return;
            }

            const sides = parseSidesValue(config, value);
            const sidesVariables: ValueToken[] = sidesPropertyKeys.map((sideKey) => ({
                type: 'variable',
                name: `${property}-${sideKey}`,
                value: sides[sideKey]
            }) as ValueToken);

            sidesVariables.push({
                type: 'variable',
                name: property,
                value: sidesPropertyKeys.map((sideKey) => ({
                    type: 'variable',
                    name: `${property}-${sideKey}`
                }))
            });

            return sidesVariables;
        }
    };

    return {
        parsers: [parser],
        generators: []
    };
};
