import { Define, NamespaceType, SourceMap, Variable } from '../types';
import type { PartialDeep } from 'type-fest';
import { replaceExportsNamespace } from './replaceExportsNamespace';
import { extractVariableNamespace } from './extractVariableNamespace';

export function setExportsNamespace<
    OldNamespace extends NamespaceType,
    NewNamespace extends NamespaceType,
    SourceSubMap extends PartialDeep<SourceMap>
>(values: Define<OldNamespace, SourceSubMap>, newNs: NewNamespace) {
    const oldNs = extractVariableNamespace<OldNamespace>(
        (values as Record<string, Variable>)[Object.keys(values)[0]]
    );

    return replaceExportsNamespace(values, oldNs, newNs);
}
