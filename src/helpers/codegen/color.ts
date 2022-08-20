import { codegenGetCSSVariable, codegenSetCSSVariable } from './variable';
import { ResolvedColorProperty } from '../../types';

export const codegenColorVariables = (name: string, color: ResolvedColorProperty) => {
    return [
        codegenSetCSSVariable(`color-${name}-h`, color.h),
        codegenSetCSSVariable(`color-${name}-s`, typeof color.s === 'string' ? color.s : `${color.s}%`),
        codegenSetCSSVariable(`color-${name}-l`, typeof color.l === 'string' ? color.l : `${color.l}%`),
        codegenSetCSSVariable(`color-${name}-a`, color.a),
        codegenSetCSSVariable(`color-${name}`, `hsla(${['h', 's', 'l', 'a'].map((key) => codegenGetCSSVariable(`color-${name}-${key}`)).join(', ')})`)
    ];
};
