import { computed, inject, MaybeRef, unref } from 'vue';
import { FormGroupKey, FormKey } from '@inkline/vue';
import { useComponentSize } from '../useComponentSize';

export function useFormComponentSize(componentName: string, size: MaybeRef<string | undefined>) {
    const form = inject(FormKey);
    const formGroup = inject(FormGroupKey);

    const formSize = computed(() => unref(size) || formGroup?.size.value || form?.size.value);
    const { size: resolvedSize } = useComponentSize(componentName, formSize);

    return { size: resolvedSize };
}
