import { Define, NamespaceType, SourceMap } from '../types';
import type { PartialDeep } from 'type-fest';
import { setExportsNamespace } from './setExportsNamespace';

export function stripExportsNamespace<
    Namespace extends NamespaceType,
    SourceSubMap extends PartialDeep<SourceMap>
>(values: Define<Namespace, SourceSubMap>) {
    return setExportsNamespace(values, '');
}
