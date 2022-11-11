import { computed, inject, provide, InjectionKey } from 'vue';

export interface FormStateInjection {
    disabled?: boolean;
    readonly?: boolean;
    size?: string;
}

export const FormStateInjectionKey = Symbol('FormState') as InjectionKey<FormStateInjection>;

export function useFormState(props: FormStateInjection) {
    const formSate = inject(FormStateInjectionKey, {
        disabled: props.disabled,
        readonly: props.readonly,
        size: props.size
    });

    const disabled = computed(() => {
        return Boolean(props.disabled || formSate.disabled);
    });

    const readonly = computed(() => {
        return Boolean(props.readonly || formSate.readonly);
    });

    const size = computed(() => {
        return props.size ? props.size : formSate.size;
    });

    provide(FormStateInjectionKey, {
        disabled: disabled.value,
        readonly: readonly.value,
        size: size.value
    });

    return { disabled, readonly, size };
}
