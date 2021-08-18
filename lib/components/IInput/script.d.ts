import { sizePropValidator } from '../../mixins';
import { Classes, InputElementEvent } from '../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The color variant of the input
     * @type light | dark
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description Display the input as clearable
     * @type Boolean
     * @default false
     */
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The disabled state of the input
     * @type Boolean
     * @default false
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The error state of the input, computed based on schema by default.
     * @type Boolean | Array
     * @default ['touched', 'dirty', 'invalid']
     */
    error: {
        type: (ArrayConstructor | BooleanConstructor)[];
        default: () => string[];
    };
    /**
     * @description The id of the internal input element
     * @type String
     * @default
     */
    id: {
        type: StringConstructor;
        default: undefined;
    };
    /**
     * @description Used to set the field value
     * @type String | Number
     * @default ''
     */
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    /**
     * @description The unique identifier of the input
     * @type String
     * @default uid()
     */
    name: {
        type: (StringConstructor | NumberConstructor)[];
        default(): string;
    };
    /**
     * @description Display the input as plaintext, disabling interaction
     * @type Boolean
     * @default false
     */
    plaintext: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The readonly state of the input
     * @type Boolean
     * @default false
     */
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The size variant of the input
     * @type sm | md | lg
     * @default md
     */
    size: {
        type: StringConstructor;
        default: () => string;
        validator: typeof sizePropValidator;
    };
    /**
     * @description The tabindex of the input
     * @type Number | String
     * @default 1
     */
    tabindex: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    /**
     * @description The type of the input
     * @type String
     * @default text
     */
    type: {
        type: StringConstructor;
        default: string;
    };
}, unknown, unknown, {
    classes(): Classes;
    hasError(): boolean;
    tabIndex(): number | string;
    isClearable(): boolean;
    value(): any;
}, {
    onBlur(event: InputElementEvent): void;
    onInput(event: InputElementEvent): void;
    onClear(event: InputElementEvent): void;
    focus(): void;
}, import("vue").DefineComponent<{}, {}, {}, {
    isDisabled(): boolean;
    isReadonly(): boolean;
    parent(): any;
    schema(): any;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>, import("vue").ComponentOptionsMixin, ("update:modelValue" | "clear")[], "update:modelValue" | "clear", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color?: unknown;
    clearable?: unknown;
    disabled?: unknown;
    error?: unknown;
    id?: unknown;
    modelValue?: unknown;
    name?: unknown;
    plaintext?: unknown;
    readonly?: unknown;
    size?: unknown;
    tabindex?: unknown;
    type?: unknown;
} & {
    error: boolean | unknown[];
    name: string | number;
    color: string;
    size: string;
    modelValue: string | number;
    type: string;
    disabled: boolean;
    tabindex: string | number;
    readonly: boolean;
    plaintext: boolean;
    clearable: boolean;
} & {
    id?: string | undefined;
}>, {
    error: boolean | unknown[];
    name: string | number;
    color: string;
    size: string;
    modelValue: string | number;
    type: string;
    disabled: boolean;
    tabindex: string | number;
    readonly: boolean;
    plaintext: boolean;
    clearable: boolean;
    id: string;
}>;
export default _default;
