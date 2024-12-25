import { HSLAColorProperty } from '../types';
import parseColor from 'color';
import { resolvePercentagePropertyValue } from './resolvePercentagePropertyValue';

export function resolveStringColorPropertyValue(value: string): HSLAColorProperty {
    const { h, s, l, alpha: a } = parseColor(value).hsl().object();
    return {
        h,
        s: resolvePercentagePropertyValue(s),
        l: resolvePercentagePropertyValue(l),
        a: a ?? 1
    };
}
