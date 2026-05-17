import { Define, NamespaceType, SourceMap } from '../types';
import type { PartialDeep } from 'type-fest';
import { capitalize, uncapitalize } from '@inkline/utils';
import { toExportedName } from './toExportedName';
import { createNamespaceString } from './createNamespaceString';

export function replaceExportsNamespace<
    OldNamespace extends NamespaceType,
    NewNamespace extends NamespaceType,
    SourceSubMap extends PartialDeep<SourceMap>
>(values: Define<OldNamespace, SourceSubMap>, oldNs: OldNamespace, newNs: NewNamespace) {
    return Object.entries(values).reduce<Record<string, unknown>>((acc, [key, value]) => {
        const oldNamespace = toExportedName(createNamespaceString(oldNs));
        const newNamespace = toExportedName(createNamespaceString(newNs));

        let replacedKey: string;
        if (oldNs === '') {
            if (newNs === '') {
                replacedKey = key;
            } else {
                replacedKey = `${newNamespace}${capitalize(key)}`;
            }
        } else {
            if (newNs === '') {
                replacedKey = `${uncapitalize(key.replace(oldNamespace, ''))}`;
            } else {
                replacedKey = key.replace(oldNamespace, newNamespace);
            }
        }

        acc[replacedKey] = value;
        return acc;
    }, {}) as Define<NewNamespace, SourceSubMap>;
}
