import { sizePropValidator } from '../../../../mixins';
import { Classes } from "../../../../types";
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The color variant of the radio group
     * @type light | dark
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description The disabled state of the radio group
     * @type Boolean
     * @default false
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Display the radio group as inline
     * @type Boolean
     * @default false
     */
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Used to set the radio group value
     * @default ''
     */
    modelValue: {
        default: string;
    };
    /**
     * @description The unique identifier of the radio group
     * @type String
     * @default uid()
     */
    name: {
        type: (StringConstructor | NumberConstructor)[];
        default(): string;
    };
    /**
     * @description The readonly state of the radio group
     * @type Boolean
     * @default false
     */
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The size variant of the radio group
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
    checked(): string;
}, {
    onChange(value: string): void;
}, import("vue").DefineComponent<{}, {}, {}, {
    isDisabled(): boolean;
    isReadonly(): boolean; /**
     * @description The color variant of the radio group
     * @type light | dark
     * @default light
     */
    parent(): any;
    schema(): any;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color?: unknown;
    disabled?: unknown;
    inline?: unknown;
    modelValue?: unknown;
    name?: unknown;
    readonly?: unknown;
    size?: unknown;
} & {
    name: string | number;
    color: string;
    size: string;
    modelValue: string;
    disabled: boolean;
    readonly: boolean;
    inline: boolean;
} & {}>, {
    name: string | number;
    color: string;
    size: string;
    modelValue: string;
    disabled: boolean;
    readonly: boolean;
    inline: boolean;
}>;
export default _default;
