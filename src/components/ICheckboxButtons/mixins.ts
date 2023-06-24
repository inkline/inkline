import { RenderFunction } from 'vue';

export interface CheckboxButtonOption {
    id: string | number;
    label: string | number | RenderFunction;
    value: string;
    disabled?: boolean;
    buttonProps?: Record<string, unknown>;
}
