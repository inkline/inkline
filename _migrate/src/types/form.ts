import type { FormValue } from '@inkline/types';
import type { Renderable } from '@inkline/inkline/types/render';

export interface FormOption {
    id: string | number;
    label?: Renderable;
    value?: FormValue;
    disabled?: boolean;
    readonly?: boolean;
    [key: string]: any;
}
