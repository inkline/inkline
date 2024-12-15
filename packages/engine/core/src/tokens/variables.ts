import { Define, DefineOptions, NamespaceType, SourceMap, Variable } from '../types';
import {
    defineBorder,
    SourceMapBorder,
    defineBorderRadius,
    SourceMapBorderRadius,
    definePadding,
    SourceMapPadding,
    defineMargin,
    SourceMapMargin,
    defineAnimation,
    SourceMapAnimation,
    defineTransition,
    SourceMapTransition,
    defineBoxShadow,
    SourceMapBoxShadow,
    defineGeneric,
    SourceMapGeneric,
    defineBackground,
    defineColor,
    SourceMapBackground,
    SourceMapColor
} from './define';
import { toCssName } from '../utils';
import type { PartialDeep } from 'type-fest';
import { isTokenValue } from '../typeGuards';

export function nsvariables<
    Namespace extends NamespaceType,
    SourceSubMap extends PartialDeep<SourceMap>
>(ns: Namespace, values: SourceSubMap, options?: DefineOptions): Define<Namespace, SourceSubMap> {
    let results: Record<string, Variable> = {};

    Object.entries(values).forEach(([name, value]) => {
        switch (name) {
            case 'animation':
                results = {
                    ...results,
                    ...defineAnimation(ns, value as SourceMapAnimation, options)
                };
                break;
            case 'border':
                results = {
                    ...results,
                    ...defineBorder(ns, value as SourceMapBorder, options)
                };
                break;
            case 'borderRadius':
                results = {
                    ...results,
                    ...defineBorderRadius(ns, value as SourceMapBorderRadius, options)
                };
                break;
            case 'boxShadow':
                results = {
                    ...results,
                    ...defineBoxShadow(ns, value as SourceMapBoxShadow, options)
                };
                break;
            case 'background':
                results = {
                    ...results,
                    ...defineBackground(ns, value as SourceMapBackground, options)
                };
                break;
            case 'color':
                results = {
                    ...results,
                    ...defineColor(ns, value as SourceMapColor, options)
                };
                break;
            case 'margin':
                results = {
                    ...results,
                    ...defineMargin(ns, value as SourceMapMargin, options)
                };
                break;
            case 'padding':
                results = {
                    ...results,
                    ...definePadding(ns, value as SourceMapPadding, options)
                };
                break;
            case 'transition':
                results = {
                    ...results,
                    ...defineTransition(ns, value as SourceMapTransition, options)
                };
                break;
            default:
                if (typeof value === 'object' && !isTokenValue(value)) {
                    const subns = [...(typeof ns === 'string' ? [ns] : ns), name] as const;
                    results = {
                        ...results,
                        ...nsvariables(subns, value as PartialDeep<SourceMap>, options)
                    };
                } else {
                    results = {
                        ...results,
                        ...defineGeneric(ns, toCssName(name), value as SourceMapGeneric, options)
                    };
                }
        }
    });

    return results as Define<Namespace, SourceSubMap>;
}

export function variables<SourceSubMap extends PartialDeep<SourceMap>>(
    values: SourceSubMap,
    options?: DefineOptions
): Define<'', SourceSubMap> {
    return nsvariables('', values, options);
}
