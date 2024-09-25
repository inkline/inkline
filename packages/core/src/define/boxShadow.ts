import {
    NamespacedKey,
    TokenValue,
    Variable,
    DefinitionOptions,
    NamespaceType
} from '../types';
import { BoxShadowProperty } from '../types';
import { nsvariable, ref, set } from '../tokens';
import { isBoxShadowProperty } from '../typeGuards';
import { resolveStringPropertyValue, toExportedVariable } from '../utils';

export type SourceMapBoxShadow = TokenValue | BoxShadowProperty;

export type OutputMapBoxShadow<Namespace extends NamespaceType> = {
    boxShadowOffsetX: Variable<NamespacedKey<Namespace, 'box-shadow-offset-x'>>;
    boxShadowOffsetY: Variable<NamespacedKey<Namespace, 'box-shadow-offset-y'>>;
    boxShadowBlurRadius: Variable<NamespacedKey<Namespace, 'box-shadow-blur-radius'>>;
    boxShadowSpreadRadius: Variable<NamespacedKey<Namespace, 'box-shadow-spread-radius'>>;
    boxShadowColor: Variable<NamespacedKey<Namespace, 'box-shadow-color'>>;
    boxShadow: Variable<NamespacedKey<Namespace, 'boxShadow'>>;
};

export function defineBoxShadow<Namespace extends NamespaceType>(
    ns: Namespace,
    value: SourceMapBoxShadow,
    options?: DefinitionOptions
): OutputMapBoxShadow<Namespace> {
    const boxShadowOffsetX = nsvariable(ns, 'box-shadow-offset-x', 0, options);
    const boxShadowOffsetY = nsvariable(ns, 'box-shadow-offset-y', 0, options);
    const boxShadowBlurRadius = nsvariable(ns, 'box-shadow-blur-radius', 0, options);
    const boxShadowSpreadRadius = nsvariable(ns, 'box-shadow-spread-radius', 0, options);
    const boxShadowColor = nsvariable(ns, 'box-shadow-color', 'transparent', options);
    const boxShadow = nsvariable(
        ns,
        'boxShadow',
        [
            ref(boxShadowOffsetX),
            ref(boxShadowOffsetY),
            ref(boxShadowBlurRadius),
            ref(boxShadowSpreadRadius),
            ref(boxShadowColor)
        ],
        options
    );

    if (isBoxShadowProperty(value)) {
        if (value.offsetX) set(boxShadowOffsetX, value.offsetX);
        if (value.offsetY) set(boxShadowOffsetY, value.offsetY);
        if (value.blurRadius) set(boxShadowBlurRadius, value.blurRadius);
        if (value.spreadRadius) set(boxShadowSpreadRadius, value.spreadRadius);
        if (value.color) set(boxShadowColor, value.color);
    } else if (typeof value === 'string') {
        const { offsetX, offsetY, blurRadius, spreadRadius, color } = resolveStringPropertyValue(
            value,
            ['offsetX', 'offsetY', 'blurRadius', 'spreadRadius', 'color']
        );

        set(boxShadowOffsetX, offsetX);
        set(boxShadowOffsetY, offsetY);
        set(boxShadowBlurRadius, blurRadius);
        set(boxShadowSpreadRadius, spreadRadius);
        set(boxShadowColor, color);
    } else {
        set(boxShadow, value);
    }

    return {
        ...toExportedVariable(boxShadowOffsetX),
        ...toExportedVariable(boxShadowOffsetY),
        ...toExportedVariable(boxShadowBlurRadius),
        ...toExportedVariable(boxShadowSpreadRadius),
        ...toExportedVariable(boxShadowColor),
        ...toExportedVariable(boxShadow)
    } as OutputMapBoxShadow<Namespace>;
}
