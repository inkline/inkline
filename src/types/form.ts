import type { RenderFunction } from 'vue';
import type { FormValue } from '@inkline/inkline/types/validation';

export interface FormOption {
    id: string | number;
    label: string | number | RenderFunction;
    value?: FormValue;
    disabled?: boolean;
    readonly?: boolean;
    [key: string]: any;
}
