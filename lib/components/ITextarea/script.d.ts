import { sizePropValidator } from '../../mixins';
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
     * @type Boolean
     * @default false
     */
    modelValue: {
        type: StringConstructor;
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
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
} & {
    name: string | number;
    color: string;
    size: string;
    modelValue: string;
    disabled: boolean;
    tabindex: string | number;
    readonly: boolean;
    clearable: boolean;
    id: string;
} & {}>, {
    name: string | number;
    color: string;
    size: string;
    modelValue: string;
    disabled: boolean;
    tabindex: string | number;
    readonly: boolean;
    clearable: boolean;
    id: string;
}>;
export default _default;
