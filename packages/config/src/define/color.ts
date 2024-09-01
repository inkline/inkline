import {
    NamespacedKey,
    NamespacedMap,
    TokenValue,
    Variable,
    DefinitionOptions,
    HSLAColorProperty,
    NamespaceType
} from '../types';
import { hsla, nsvariable, ref, set } from '../tokens';
import { isHSLAColorProperty } from '../typeGuards';
import { resolveStringColorPropertyValue, toExportedVariable } from '../utils';

export type SourceMapColor = TokenValue | HSLAColorProperty;

export type OutputMapColor<Namespace extends NamespaceType> = {
    colorH: Variable<NamespacedKey<Namespace, 'color-h'>>;
    colorS: Variable<NamespacedKey<Namespace, 'color-s'>>;
    colorL: Variable<NamespacedKey<Namespace, 'color-l'>>;
    colorA: Variable<NamespacedKey<Namespace, 'color-a'>>;
    color: Variable<NamespacedKey<Namespace, 'color'>>;
};

export type SourceMapBackground = SourceMapColor;

export type OutputMapBackground<Namespace extends NamespaceType> = {
    backgroundH: Variable<NamespacedKey<Namespace, 'background-h'>>;
    backgroundS: Variable<NamespacedKey<Namespace, 'background-s'>>;
    backgroundL: Variable<NamespacedKey<Namespace, 'background-l'>>;
    backgroundA: Variable<NamespacedKey<Namespace, 'background-a'>>;
    background: Variable<NamespacedKey<Namespace, 'background'>>;
};

export function defineColorFn<Namespace extends NamespaceType, ReturnType>(
    propertyName: string
): (ns: Namespace, value: SourceMapColor, options?: DefinitionOptions) => ReturnType {
    return (ns, value, options) => {
        const colorH = nsvariable(ns, `${propertyName}-h`, 0, options);
        const colorS = nsvariable(ns, `${propertyName}-s`, '0%', options);
        const colorL = nsvariable(ns, `${propertyName}-l`, '0%', options);
        const colorA = nsvariable(ns, `${propertyName}-a`, 1, options);
        const color = nsvariable(
            ns,
            propertyName,
            hsla([ref(colorH), ref(colorS), ref(colorL), ref(colorA)]),
            options
        );

        if (isHSLAColorProperty(value)) {
            if (value.h) set(colorH, value.h);
            if (value.s) set(colorS, value.s);
            if (value.l) set(colorL, value.l);
            if (value.a) set(colorA, value.a);
        } else if (typeof value === 'string') {
            const { h, s, l, a } = resolveStringColorPropertyValue(value);
            set(colorH, h);
            set(colorS, s);
            set(colorL, l);
            set(colorA, a);
        } else {
            set(color, value as TokenValue);
        }

        return {
            ...toExportedVariable(colorH),
            ...toExportedVariable(colorS),
            ...toExportedVariable(colorL),
            ...toExportedVariable(colorA),
            ...toExportedVariable(color)
        } as ReturnType;
    };
}

export const defineColor: <Namespace extends NamespaceType>(
    ns: Namespace,
    value: SourceMapColor,
    options?: DefinitionOptions
) => OutputMapColor<Namespace> = defineColorFn('color');

export const defineBackground: <Namespace extends NamespaceType>(
    ns: Namespace,
    value: SourceMapBackground,
    options?: DefinitionOptions
) => OutputMapBackground<Namespace> = defineColorFn('background');
