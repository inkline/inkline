import { NamespacedKey, TokenValue, Variable, DefineOptions, NamespaceType } from '../../types';
import { nsvariable } from '../../tokens';
import { toExportedVariable } from '../../utils';

export type SourceMapGeneric = TokenValue;

export type OutputMapGeneric<Namespace extends NamespaceType, Name extends string> = Record<
    Name,
    Variable<NamespacedKey<Namespace, Name>>
>;

export function defineGeneric<Namespace extends NamespaceType, Name extends string>(
    ns: Namespace,
    name: Name,
    value: SourceMapGeneric,
    options?: DefineOptions
): OutputMapGeneric<Namespace, Name> {
    const generic = nsvariable(ns, name, value, options);

    return {
        ...toExportedVariable(generic)
    } as OutputMapGeneric<Namespace, Name>;
}
