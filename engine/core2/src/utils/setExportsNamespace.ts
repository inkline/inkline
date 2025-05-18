import { Define, NamespaceType, SourceMap, Variable } from '../types';
import type { PartialDeep } from 'type-fest';
import { replaceExportsNamespace } from './replaceExportsNamespace';
import { extractVariableNamespace } from './extractVariableNamespace';

export function setExportsNamespace<
    OldNamespace extends NamespaceType,
    NewNamespace extends NamespaceType,
    SourceSubMap extends PartialDeep<SourceMap>
>(values: Define<OldNamespace, SourceSubMap>, newNs: NewNamespace) {
    type KeyType = keyof typeof values;
    const keys: KeyType[] = Object.keys(values) as KeyType[];
    const oldNs = extractVariableNamespace<OldNamespace>(values[keys[0]] as Variable);

    return replaceExportsNamespace(values, oldNs, newNs);
}
