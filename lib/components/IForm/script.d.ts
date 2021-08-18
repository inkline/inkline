import { sizePropValidator } from '../../mixins';
import { Classes, InputElementEvent } from '../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The color variant of the form
     * @type light | dark
     * @default light
     */
    color: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description The disabled state of the form
     * @type Boolean
     * @default false
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Display the form as inline
     * @type Boolean
     * @default false
     */
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The loading state of the form
     * @type Boolean
     * @default false
     */
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The unique identifier of the form
     * @type String
     * @default uid()
     */
    name: {
        type: StringConstructor;
        default(): string;
    };
    /**
     * @description Used to set the form schema
     * @type Boolean
     * @default false
     */
    modelValue: {
        type: ObjectConstructor;
        default: () => null;
    };
    /**
     * @description The readonly state of the form
     * @type Boolean
     * @default false
     */
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The size variant of the form
     * @type sm | md | lg
     * @default md
     */
    size: {
        type: StringConstructor;
        default: () => string;
        validator: typeof sizePropValidator;
    };
}, unknown, unknown, {
    classes(): Classes;
    schema(): any;
}, {
    onBlur(name: string, event: InputElementEvent): void;
    onInput(name: string, value: any): void;
    onSubmit(event: InputElementEvent): void;
    shouldValidate(path: string, eventName: string): boolean;
}, import("vue").DefineComponent<{}, {}, {}, {
    isDisabled(): boolean;
    isReadonly(): boolean;
    parent(): any;
    schema(): any;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>, import("vue").ComponentOptionsMixin, ("submit" | "update:modelValue")[], "submit" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color?: unknown;
    disabled?: unknown;
    inline?: unknown;
    loading?: unknown;
    name?: unknown;
    modelValue?: unknown;
    readonly?: unknown;
    size?: unknown;
} & {
    name: string;
    color: string;
    size: string;
    modelValue: Record<string, any>;
    disabled: boolean;
    loading: boolean;
    readonly: boolean;
    inline: boolean;
} & {}>, {
    name: string;
    color: string;
    size: string;
    modelValue: Record<string, any>;
    disabled: boolean;
    loading: boolean;
    readonly: boolean;
    inline: boolean;
}>;
export default _default;
