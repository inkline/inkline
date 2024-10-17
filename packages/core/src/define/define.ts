import { Define, DefinitionOptions, NamespaceType, SourceMap, Variable } from '../types';
import { defineBorder, SourceMapBorder } from './border';
import { defineBorderRadius, SourceMapBorderRadius } from './borderRadius';
import { definePadding, SourceMapPadding } from './padding';
import { defineMargin, SourceMapMargin } from './margin';
import { defineAnimation, SourceMapAnimation } from './animation';
import { defineTransition, SourceMapTransition } from './transition';
import { defineBoxShadow, SourceMapBoxShadow } from './boxShadow';
import { defineGeneric, SourceMapGeneric } from './generic';
import { defineBackground, defineColor, SourceMapBackground, SourceMapColor } from './color';
import { PartialDeep } from 'type-fest';
import { toCssName } from '../utils';

export function nsdefine<
    Namespace extends NamespaceType,
    SourceSubMap extends PartialDeep<SourceMap>
>(
    ns: Namespace,
    values: SourceSubMap,
    options?: DefinitionOptions
): Define<Namespace, SourceSubMap> {
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
                results = {
                    ...results,
                    ...defineGeneric(ns, toCssName(name), value as SourceMapGeneric, options)
                };
        }
    });

    return results as Define<Namespace, SourceSubMap>;
}

export function define<SourceSubMap extends PartialDeep<SourceMap>>(
    values: SourceSubMap,
    options?: DefinitionOptions
): Define<'', SourceSubMap> {
    return nsdefine('', values, options);
}
