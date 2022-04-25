import { Theme, UserConfiguration } from '../types';
import { sidesPropertyKeys } from '../constants';
import { codegenGetCSSVariable, codegenSetCSSVariable } from '../helpers';

export const colorGenerators: UserConfiguration.GeneratorPlugin<{}, Theme['color']> = () => [
    {
        test: /(.*)color\.(.+)$/,
        generate: ({ value, path }) => {
            const colorName = path[path.length - 1];

            return ['/**', ' * Color variable', ' */']
                .concat([
                    codegenSetCSSVariable(`color-${colorName}-h`, value.h),
                    codegenSetCSSVariable(`color-${colorName}-s`, value.s),
                    codegenSetCSSVariable(`color-${colorName}-l`, value.l),
                    codegenSetCSSVariable(`color-${colorName}-a`, value.alpha),
                    codegenSetCSSVariable(`color-${colorName}`, ['h', 's', 'l', 'alpha'])
                ])
                .concat([
                    codegenSetCSSVariable('margin', sidesPropertyKeys.map(
                        (side) => codegenGetCSSVariable(`margin-${side}`)
                    ).join(' '))
                ])
        }
    }
];
