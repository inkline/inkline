import { computed, MaybeRef, unref } from 'vue';
import { useComponentSize } from '../useComponentSize';
import { useInjectForm } from './useInjectForm';

export function useFormComponentSize(componentName: string, size: MaybeRef<string | undefined>) {
    const { form, formGroup } = useInjectForm();

    const formSize = computed(() => unref(size) || unref(formGroup?.size) || unref(form?.size));
    const { size: resolvedSize } = useComponentSize(componentName, formSize);

    return { size: resolvedSize };
}
