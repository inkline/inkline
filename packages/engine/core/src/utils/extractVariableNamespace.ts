import { NamespaceType, Variable } from '../types';

/**
 * Extracts the namespace from a variable.
 */
export function extractVariableNamespace<Namespace extends NamespaceType>(
    variable: Variable
): Namespace {
    const parts = variable.__name.split('--');
    return (parts.length > 1 ? parts.slice(0, -1) : '') as Namespace;
}
