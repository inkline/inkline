import { Theme, UserConfiguration } from '../types';
import { sidesPropertyKeys } from '../constants';
import { codegenGetCSSVariable, codegenSetCSSVariable } from '../helpers';

export const colorGenerators: UserConfiguration.GeneratorPlugin<{}, Theme['color'][string]> = () => [
    {
        test: /(.*)color\.(.+)$/,
        generate: ({ value, path }) => {
            const colorName = path[path.length - 1];

            return ['/**', ` * Color ${colorName} variable`, ' */']
                .concat([
                    codegenSetCSSVariable(`color-${colorName}-h`, value.h),
                    codegenSetCSSVariable(`color-${colorName}-s`, value.s),
                    codegenSetCSSVariable(`color-${colorName}-l`, value.l),
                    codegenSetCSSVariable(`color-${colorName}-a`, value.a),
                    codegenSetCSSVariable(`color-${colorName}`, `hsla(${['h', 's', 'l', 'a'].map((key) => codegenGetCSSVariable(`color-${colorName}-${key}`)).join(', ')})`)
                ]);
        }
    }
];
