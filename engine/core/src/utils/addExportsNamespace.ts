import { NamespacedMap, NamespaceType, SourceMap } from '../types';
import type { PartialDeep } from 'type-fest';
import { toExportedName } from './toExportedName';
import { createNamespaceString } from './createNamespaceString';
import { capitalize } from '@inkline/utils';

export function addExportsNamespace<
    Namespace extends NamespaceType,
    SourceSubMap extends PartialDeep<SourceMap>
>(values: SourceSubMap, ns: Namespace): NamespacedMap<Namespace, SourceSubMap> {
    return Object.entries(values).reduce<Record<string, unknown>>((acc, [key, value]) => {
        const namespace = createNamespaceString(ns);

        acc[toExportedName(`${namespace}${capitalize(key)}`)] = value;
        return acc;
    }, {}) as NamespacedMap<Namespace, SourceSubMap>;
}
