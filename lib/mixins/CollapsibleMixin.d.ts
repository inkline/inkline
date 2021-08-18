import { Classes } from '../types';
declare const _default: import("vue").DefineComponent<{
    collapse: {
        type: (BooleanConstructor | StringConstructor)[];
        default: string;
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, {
    open: boolean;
    windowWidth: number;
}, {
    collapsibleClasses(): Classes;
    collapsible(): boolean;
}, {
    setOpen(value: boolean): void;
    toggleOpen(): void;
    onWindowResize(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    collapse?: unknown;
    modelValue?: unknown;
} & {
    collapse: string | boolean;
    modelValue: boolean;
} & {}>, {
    collapse: string | boolean;
    modelValue: boolean;
}>;
export default _default;
