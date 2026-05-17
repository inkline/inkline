import { NamespacedKey, NamespaceType } from '../types';

/**
 * Creates a namespaced token name by joining the namespace array and name with `--`.
 */
export function createNamespacedTokenName<Namespace extends NamespaceType, Name extends string>(
    namespace: Namespace,
    name: Name
): NamespacedKey<Namespace, Name> {
    const namespaceArray = Array.isArray(namespace) ? namespace : namespace ? [namespace] : [];

    return [...namespaceArray, name].join('--') as NamespacedKey<Namespace, Name>;
}
