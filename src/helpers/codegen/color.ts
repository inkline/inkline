import { codegenGetCSSVariable, codegenSetCSSVariable } from './variable';
import { ResolvedColorProperty } from '../../types';

export const codegenColorVariables = (name: string, color: ResolvedColorProperty, prefix: string = 'color') => {
    return typeof color === 'string'
        ? [
            codegenSetCSSVariable(`${prefix}-${name}`, color)
        ]
        : [
            codegenSetCSSVariable(`${prefix}-${name}-h`, color.h),
            codegenSetCSSVariable(`${prefix}-${name}-s`, typeof color.s === 'string' ? color.s : `${color.s}%`),
            codegenSetCSSVariable(`${prefix}-${name}-l`, typeof color.l === 'string' ? color.l : `${color.l}%`),
            codegenSetCSSVariable(`${prefix}-${name}-a`, color.a),
            codegenSetCSSVariable(`${prefix}-${name}`, `hsla(${['h', 's', 'l', 'a'].map((key) => codegenGetCSSVariable(`${prefix}-${name}-${key}`)).join(', ')})`)
        ];
};
