import { FormOption } from '@inkline/inkline/types';

export type CheckableButtonGroupVariant = 'default' | 'group';

export interface CheckableButtonGroupOption extends FormOption {
    buttonProps?: Record<string, unknown>;
}
