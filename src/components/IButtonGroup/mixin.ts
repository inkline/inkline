import type { InjectionKey } from 'vue';

export interface ButtonGroupInjection {
    disabled?: boolean;
    size?: string;
}

export const ButtonGroupInjectionKey = Symbol('ButtonGroup') as InjectionKey<ButtonGroupInjection>;
