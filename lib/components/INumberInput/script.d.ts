import { sizePropValidator } from '../../mixins/props';
import { InputElementEvent } from '../../types';
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
     * @description The id of the internal input element
     * @type String
     * @default
     */
    id: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description Used to set the field value
     * @type String | Number
     * @default
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
     * @description The minimum allowed input value
     * @type Number
     * @default -Infinity
     */
    min: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    /**
     * @description The maximum allowed input value
     * @type Number
     * @default +Infinity
     */
    max: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    /**
     * @description The precision of the input value, for floating point numbers
     * @type Number
     * @default 0
     */
    precision: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description The increment step to increase or decrease the value by
     * @type Number
     * @default 1
     */
    step: {
        type: NumberConstructor;
        default: number;
    };
}, unknown, unknown, {}, {
    decrease(): void;
    increase(): void;
    formatPrecision(value: string): string;
    onBlurFormatPrecision(event: InputElementEvent): void;
}, import("vue").ComponentOptionsMixin, import("vue").DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    [x: string]: unknown;
} & {} & {
    [x: string]: unknown;
}>, {}>, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color?: unknown;
    clearable?: unknown;
    disabled?: unknown;
    id?: unknown;
    modelValue?: unknown;
    name?: unknown;
    readonly?: unknown;
    size?: unknown;
    tabindex?: unknown;
    min?: unknown;
    max?: unknown;
    precision?: unknown;
    step?: unknown;
} & {
    name: string | number;
    color: string;
    size: string;
    modelValue: string | number;
    disabled: boolean;
    tabindex: string | number;
    readonly: boolean;
    clearable: boolean;
    id: string;
    min: string | number;
    max: string | number;
    precision: number;
    step: number;
} & {}>, {
    name: string | number;
    color: string;
    size: string;
    modelValue: string | number;
    disabled: boolean;
    tabindex: string | number;
    readonly: boolean;
    clearable: boolean;
    id: string;
    min: string | number;
    max: string | number;
    precision: number;
    step: number;
}>;
export default _default;
