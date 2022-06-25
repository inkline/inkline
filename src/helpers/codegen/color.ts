import { codegenGetCSSVariable, codegenSetCSSVariable } from './variable';
import { ThemeColor } from '../../types';

export const codegenColorVariables = (name: string, color: ThemeColor) => {
    return [
        codegenSetCSSVariable(`color-${name}-h`, color.h),
        codegenSetCSSVariable(`color-${name}-s`, color.s),
        codegenSetCSSVariable(`color-${name}-l`, color.l),
        codegenSetCSSVariable(`color-${name}-a`, color.a),
        codegenSetCSSVariable(`color-${name}`, `hsla(${['h', 's', 'l', 'a'].map((key) => codegenGetCSSVariable(`color-${name}-${key}`)).join(', ')})`)
    ];
};
