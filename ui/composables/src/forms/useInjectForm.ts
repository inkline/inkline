import { inject } from 'vue';
import { FormGroupKey, FormKey } from '@inkline/types';

export function useInjectForm() {
    const form = inject(FormKey, null);
    const formGroup = inject(FormGroupKey, null);

    return {
        form,
        formGroup
    };
}
