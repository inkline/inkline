import { Variable } from '../types';
import { toExportedName } from './toExportedName';

export function toExportedVariable<Name extends string>(variable: Variable<Name>) {
    return {
        [toExportedName(variable.__name)]: variable
    };
}
