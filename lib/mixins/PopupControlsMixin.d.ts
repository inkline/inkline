declare const _default: import("vue").DefineComponent<{
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: BooleanConstructor;
        default: undefined;
    };
    trigger: {
        type: ArrayConstructor;
        default: () => string[];
    };
}, unknown, {
    visible: boolean | undefined;
    triggerStack: number;
}, {}, {
    show(): void;
    hide(): void;
    onClick(): void;
    onClickOutside(): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    focusTrigger(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    disabled?: unknown;
    modelValue?: unknown;
    trigger?: unknown;
} & {
    disabled: boolean;
    trigger: unknown[];
} & {
    modelValue?: boolean | undefined;
}>, {
    modelValue: boolean;
    disabled: boolean;
    trigger: unknown[];
}>;
export default _default;
