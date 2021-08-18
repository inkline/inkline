import { sizePropValidator } from '../../mixins';
import { Classes } from '../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The size variant of the alert
     * @type sm | md | lg
     * @default md
     */
    size: {
        type: StringConstructor;
        default: () => string;
        validator: typeof sizePropValidator;
    };
    /**
     * @description The color variant of the alert
     * @type info | success | warning | danger
     * @default info
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description Used to show or hide a dismissible alert
     * @type Boolean
     * @default true
     */
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Shows a dismiss icon on the alert
     * @type Boolean
     * @default false
     */
    dismissible: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, {
    dismissed: boolean;
}, {
    classes(): Classes;
}, {
    dismiss(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    size?: unknown;
    color?: unknown;
    modelValue?: unknown;
    dismissible?: unknown;
} & {
    color: string;
    size: string;
    modelValue: boolean;
    dismissible: boolean;
} & {}>, {
    color: string;
    size: string;
    modelValue: boolean;
    dismissible: boolean;
}>;
export default _default;
