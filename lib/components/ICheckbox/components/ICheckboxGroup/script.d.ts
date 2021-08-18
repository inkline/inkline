import { sizePropValidator } from '../../../../mixins';
import { Classes } from '../../../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The color variant of the checkbox group
     * @type light | dark
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description The disabled state of the checkbox group
     * @type Boolean
     * @default false
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Display the checkbox group as inline
     * @type Boolean
     * @default false
     */
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The indeterminate state of the checkbox group
     * @type Boolean
     * @default false
     */
    indeterminate: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Used to set the checkbox group value
     * @default []
     */
    modelValue: {
        default: () => any[];
    };
    /**
     * @description The unique identifier of the checkbox group
     * @type String
     * @default uid()
     */
    name: {
        type: (StringConstructor | NumberConstructor)[];
        default(): string;
    };
    /**
     * @description The readonly state of the checkbox group
     * @type Boolean
     * @default false
     */
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The size variant of the checkbox group
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
    checked(): any[];
}, {
    onChange(value: any): void;
}, import("vue").DefineComponent<{}, {}, {}, {
    isDisabled(): boolean;
    isReadonly(): boolean;
    /**
     * @description The color variant of the checkbox group
     * @type light | dark
     * @default light
     */
    parent(): any;
    schema(): any;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color?: unknown;
    disabled?: unknown;
    inline?: unknown;
    indeterminate?: unknown;
    modelValue?: unknown;
    name?: unknown;
    readonly?: unknown;
    size?: unknown;
} & {
    name: string | number;
    color: string;
    size: string;
    modelValue: any[];
    disabled: boolean;
    indeterminate: boolean;
    readonly: boolean;
    inline: boolean;
} & {}>, {
    name: string | number;
    color: string;
    size: string;
    modelValue: any[];
    disabled: boolean;
    indeterminate: boolean;
    readonly: boolean;
    inline: boolean;
}>;
export default _default;
