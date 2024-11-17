import { ExportedName } from '../types';
import { toCamelCase } from '@inkline/utils';

export function toExportedName<T extends string>(name: T): ExportedName<T> {
    return toCamelCase(name.replace(/-+/g, '-')) as ExportedName<T>;
}
