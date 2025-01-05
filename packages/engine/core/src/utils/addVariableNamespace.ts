import { DefinitionOptions, NamespaceType, Variable } from '../types';
import { isRef } from '../typeGuards';
import { nsvariable, ref } from '../tokens';
import { createNamespacedTokenName } from './createNamespacedTokenName';

/**
 * Creates a namespace for a variable and returns the namespaced variable.
 *
 * This function is used to create a namespaced variable from an existing variable.
 * Namespaced variables are used to group related variables together.
 */
export function addVariableNamespace<Namespace extends NamespaceType, Name extends string>(
    ns: Namespace,
    instance: Variable<Name>,
    options: DefinitionOptions
) {
    const namespacedValue = Array.isArray(instance.__value)
        ? instance.__value.map((value) =>
              isRef(value)
                  ? ref(createNamespacedTokenName(ns, value.__name), value.__fallback)
                  : value
          )
        : ref(instance);

    return nsvariable(ns, instance.__name, namespacedValue, options);
}
