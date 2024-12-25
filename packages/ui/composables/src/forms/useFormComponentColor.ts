import { computed, MaybeRef, unref } from 'vue';
import { useComponentColor } from '../useComponentColor';
import { useInjectForm } from './useInjectForm';

export function useFormComponentColor(componentName: string, color: MaybeRef<string | undefined>) {
    const { form, formGroup } = useInjectForm();

    const formColor = computed(() => unref(color) || unref(formGroup?.color) || unref(form?.color));
    const { color: resolvedColor } = useComponentColor(componentName, formColor);

    return { color: resolvedColor };
}
