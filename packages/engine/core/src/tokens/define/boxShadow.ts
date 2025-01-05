import {
    NamespacedKey,
    TokenValue,
    Variable,
    VariablesOptions,
    NamespaceType,
    NamespacedMap
} from '../../types';
import { BoxShadowProperty } from '../../types';
import { nsvariable, ref, set } from '../../tokens';
import { isBoxShadowProperty } from '../../typeGuards';
import { resolveStringPropertyValue, toExportedVariable } from '../../utils';

export type SourceMapBoxShadow = TokenValue | BoxShadowProperty;

export type OutputMapBoxShadow<Namespace extends NamespaceType> = NamespacedMap<
    Namespace,
    {
        boxShadowOffsetX: Variable<NamespacedKey<Namespace, 'box-shadow-offset-x'>>;
        boxShadowOffsetY: Variable<NamespacedKey<Namespace, 'box-shadow-offset-y'>>;
        boxShadowBlurRadius: Variable<NamespacedKey<Namespace, 'box-shadow-blur-radius'>>;
        boxShadowSpreadRadius: Variable<NamespacedKey<Namespace, 'box-shadow-spread-radius'>>;
        boxShadowColor: Variable<NamespacedKey<Namespace, 'box-shadow-color'>>;
        boxShadow: Variable<NamespacedKey<Namespace, 'box-shadow'>>;
    }
>;

export function defineBoxShadow<Namespace extends NamespaceType>(
    ns: Namespace,
    value: SourceMapBoxShadow,
    options: VariablesOptions
): OutputMapBoxShadow<Namespace> {
    const boxShadowOffsetX = nsvariable(ns, 'box-shadow-offset-x', 0, options);
    const boxShadowOffsetY = nsvariable(ns, 'box-shadow-offset-y', 0, options);
    const boxShadowBlurRadius = nsvariable(ns, 'box-shadow-blur-radius', 0, options);
    const boxShadowSpreadRadius = nsvariable(ns, 'box-shadow-spread-radius', 0, options);
    const boxShadowColor = nsvariable(ns, 'box-shadow-color', 'transparent', options);
    const boxShadow = nsvariable(
        ns,
        'box-shadow',
        [
            ref(boxShadowOffsetX),
            ref(boxShadowOffsetY),
            ref(boxShadowBlurRadius),
            ref(boxShadowSpreadRadius),
            ref(boxShadowColor)
        ],
        {
            ...options,
            register: options.registerComposed ?? true
        }
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

        if (offsetX) set(boxShadowOffsetX, offsetX);
        if (offsetY) set(boxShadowOffsetY, offsetY);
        if (blurRadius) set(boxShadowBlurRadius, blurRadius);
        if (spreadRadius) set(boxShadowSpreadRadius, spreadRadius);
        if (color) set(boxShadowColor, color);
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
