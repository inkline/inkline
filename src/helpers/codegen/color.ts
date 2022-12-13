import { codegenGetCSSVariable, codegenSetCSSVariable } from './variable';
import { ResolvedColorProperty } from '../../types';

const varRegEx = /var\(--(.+)\)/;

export const codegenColorVariables = (name: string, color: ResolvedColorProperty, prefix: string = 'color') => {
    if (typeof color === 'string') {
        const valueMatch = color.match(varRegEx);
        if (valueMatch) {
            const variableName = valueMatch[1];
            return [
                codegenSetCSSVariable(`${prefix}-${name}-h`, codegenGetCSSVariable(`${variableName}-h`)),
                codegenSetCSSVariable(`${prefix}-${name}-s`, codegenGetCSSVariable(`${variableName}-s`)),
                codegenSetCSSVariable(`${prefix}-${name}-l`, codegenGetCSSVariable(`${variableName}-l`)),
                codegenSetCSSVariable(`${prefix}-${name}-a`, codegenGetCSSVariable(`${variableName}-a`)),
                codegenSetCSSVariable(`${prefix}-${name}`, `hsla(${['h', 's', 'l', 'a'].map((key) => codegenGetCSSVariable(`${prefix}-${name}-${key}`)).join(', ')})`)
            ];
        }

        return [
            codegenSetCSSVariable(`${prefix}-${name}`, color)
        ];
    }

    return [
        codegenSetCSSVariable(`${prefix}-${name}-h`, color.h),
        codegenSetCSSVariable(`${prefix}-${name}-s`, typeof color.s === 'string' ? color.s : `${color.s}%`),
        codegenSetCSSVariable(`${prefix}-${name}-l`, typeof color.l === 'string' ? color.l : `${color.l}%`),
        codegenSetCSSVariable(`${prefix}-${name}-a`, color.a),
        codegenSetCSSVariable(`${prefix}-${name}`, `hsla(${['h', 's', 'l', 'a'].map((key) => codegenGetCSSVariable(`${prefix}-${name}-${key}`)).join(', ')})`)
    ];
};
