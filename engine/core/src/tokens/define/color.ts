import {
    NamespacedKey,
    TokenValue,
    Variable,
    DefinitionOptions,
    HSLAColorProperty,
    NamespaceType,
    NamespacedMap
} from '../../types';
import { nscolor } from '../../tokens';
import { toExportedVariable } from '../../utils';

export type SourceMapColor = TokenValue | HSLAColorProperty;

export type OutputMapColor<Namespace extends NamespaceType> = NamespacedMap<
    Namespace,
    {
        color: Variable<NamespacedKey<Namespace, 'color'>>;
    }
>;

export type SourceMapBackground = SourceMapColor;

export type OutputMapBackground<Namespace extends NamespaceType> = NamespacedMap<
    Namespace,
    {
        background: Variable<NamespacedKey<Namespace, 'background'>>;
    }
>;

export function defineColorFn<Namespace extends NamespaceType, ReturnType>(
    propertyName: string
): (ns: Namespace, value: SourceMapColor, options: DefinitionOptions) => ReturnType {
    return (ns, value, options) => {
        const color = nscolor(ns, propertyName, value, options);

        return {
            ...toExportedVariable(color)
        } as ReturnType;
    };
}

export const defineColor: <Namespace extends NamespaceType>(
    ns: Namespace,
    value: SourceMapColor,
    options: DefinitionOptions
) => OutputMapColor<Namespace> = defineColorFn('color');

export const defineBackground: <Namespace extends NamespaceType>(
    ns: Namespace,
    value: SourceMapBackground,
    options: DefinitionOptions
) => OutputMapBackground<Namespace> = defineColorFn('background');
