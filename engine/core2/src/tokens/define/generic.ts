import {
    NamespacedKey,
    TokenValue,
    Variable,
    DefinitionOptions,
    NamespaceType,
    NamespacedMap
} from '../../types';
import { nsvariable } from '../variable';
import { toExportedVariable } from '../../utils';

export type SourceMapGeneric = TokenValue;

export type OutputMapGeneric<Namespace extends NamespaceType, Name extends string> = NamespacedMap<
    Namespace,
    Record<Name, Variable<NamespacedKey<Namespace, Name>>>
>;

export function defineGeneric<Namespace extends NamespaceType, Name extends string>(
    ns: Namespace,
    name: Name,
    value: SourceMapGeneric,
    options: DefinitionOptions
): OutputMapGeneric<Namespace, Name> {
    const generic = nsvariable(ns, name, value, options);

    return {
        ...toExportedVariable(generic)
    } as OutputMapGeneric<Namespace, Name>;
}
