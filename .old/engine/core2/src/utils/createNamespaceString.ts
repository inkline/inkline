import { NamespacedKey, NamespaceType } from '../types';

/**
 * Creates a namespace string by joining the namespace array with `--`.
 */
export function createNamespaceString<Namespace extends NamespaceType>(
    namespace: Namespace
): NamespacedKey<Namespace, ''> {
    return (Array.isArray(namespace) ? namespace.join('--') : namespace) as NamespacedKey<
        Namespace,
        ''
    >;
}
