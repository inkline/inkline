import { Generator, ResolvedTheme } from '../types';
import { borderProperties, MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX, sidesPropertyKeys } from '../constants';
import { codegenGetCSSVariable, codegenSetCSSVariable } from '../helpers';

export const borderGenerator: Generator<ResolvedTheme['border']> = {
    name: 'border',
    location: 'root',
    test: /(.*)border$/,
    skip: [MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX],
    apply: ({ value }) => ['/**', ' * Border variables', ' */']
        .concat(
            borderProperties.map((property) => {
                const variables = sidesPropertyKeys
                    .filter((side) => value[side][property])
                    .map((side) =>
                        codegenSetCSSVariable(`border-${side}-${property}`, value[side][property])
                    );

                return variables.length === 0
                    ? []
                    : [
                        variables,
                        codegenSetCSSVariable(`border-${property}`, sidesPropertyKeys.map((side) =>
                            codegenGetCSSVariable(`border-${side}-${property}`)
                        ).join(' '))
                    ].flat();
            }).flat()
        )
};

export const borderGenerators = [
    borderGenerator
];
