import { sizePropValidator } from '../../../../mixins';
import { Classes, InputElementEvent } from '../../../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The color variant of the form group
     * @type light | dark
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description The disabled state of the form group
     * @type Boolean
     * @default false
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Display the form group as inline
     * @type Boolean
     * @default false
     */
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The identifier of the form group
     * @type String
     * @default
     */
    name: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description The readonly state of the form group
     * @type Boolean
     * @default false
     */
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The required state of the form group
     * @type Boolean
     * @default false
     */
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The size variant of the form group
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
}, {
    onBlur(name: string, event: InputElementEvent): void;
    onInput(name: string, value: any): void;
}, import("vue").DefineComponent<{}, {}, {}, {
    isDisabled(): boolean;
    isReadonly(): boolean;
    parent(): any;
    schema(): any;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color?: unknown;
    disabled?: unknown;
    inline?: unknown;
    name?: unknown;
    readonly?: unknown;
    required?: unknown;
    size?: unknown;
} & {
    name: string;
    color: string;
    size: string;
    disabled: boolean;
    readonly: boolean;
    inline: boolean;
    required: boolean;
} & {}>, {
    name: string;
    color: string;
    size: string;
    disabled: boolean;
    readonly: boolean;
    inline: boolean;
    required: boolean;
}>;
export default _default;
