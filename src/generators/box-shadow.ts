import { Generator, ResolvedTheme } from '../types';
import { boxShadowProperties, MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX } from '../constants';
import { codegenGetCSSVariable, codegenSetCSSVariable } from '../helpers';
import { toDashCase } from '@grozav/utils';

export const boxShadowGenerator: Generator<ResolvedTheme['boxShadow']> = {
    name: 'box-shadow',
    location: 'root',
    test: /(.*)boxShadow$/,
    skip: [MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX],
    apply: ({ value }) => {
        const properties = boxShadowProperties.filter(
            (property) => typeof value[property] !== 'undefined'
        );

        return ['/**', ' * Box shadow variables', ' */'].concat(
            properties.map((property) =>
                codegenSetCSSVariable(`box-shadow-${toDashCase(property)}`, value[property])
            ),
            codegenSetCSSVariable(
                'box-shadow',
                properties
                    .map((property) => codegenGetCSSVariable(`box-shadow-${toDashCase(property)}`))
                    .join(' ')
            )
        );
    }
};

export const boxShadowGenerators: Generator[] = [boxShadowGenerator];
