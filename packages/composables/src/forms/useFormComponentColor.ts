import { computed, inject, MaybeRef, unref } from 'vue';
import { FormGroupKey, FormKey } from '@inkline/vue';
import { useComponentColor } from '../useComponentColor';

export function useFormComponentColor(componentName: string, color: MaybeRef<string | undefined>) {
    const form = inject(FormKey);
    const formGroup = inject(FormGroupKey);

    const formColor = computed(() => unref(color) || formGroup?.color.value || form?.color.value);
    const { color: resolvedColor } = useComponentColor(componentName, formColor);

    return { color: resolvedColor };
}
