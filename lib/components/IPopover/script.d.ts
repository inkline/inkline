import { sizePropValidator } from '../../mixins';
import { Classes } from '../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The color variant of the popover
     * @type light | dark
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description The disabled state of the popover
     * @type Boolean
     * @default false
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Used to manually control the visibility of the popover
     * @type Boolean
     * @default false
     */
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Displays an arrow on the popover pointing to the trigger element
     * @type Boolean
     * @default true
     */
    arrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The placement of the popover
     * @type top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end
     * @default false
     */
    placement: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description The events used to trigger the popover
     * @type hover | focus | click | manual
     * @default [click]
     */
    trigger: {
        type: (ArrayConstructor | StringConstructor)[];
        default: () => string[];
    };
    /**
     * @description The offset of the popover relative to the trigger element
     * @type Number
     * @default 6
     */
    offset: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description Used to override the popper.js options used for creating the popover
     * @type Object
     * @default {}
     */
    popperOptions: {
        type: ObjectConstructor;
        default: () => any;
    };
    /**
     * @description The size variant of the popover
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
    onEscape(): void;
    handleClickOutside(): void;
}, import("vue").DefineComponent<{
    placement: {
        type: StringConstructor;
        default: import("@popperjs/core").Placement;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    popperOptions: {
        type: ObjectConstructor;
        default: () => {};
    };
}, unknown, {
    popperInstance?: import("@popperjs/core").Instance | undefined; /**
     * @description The events used to trigger the popover
     * @type hover | focus | click | manual
     * @default [click]
     */
}, {}, {
    createPopper(): void;
    destroyPopper(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    placement?: unknown;
    offset?: unknown;
    popperOptions?: unknown;
} & {
    offset: number;
    placement: string;
    popperOptions: Record<string, any>;
} & {}>, {
    offset: number;
    placement: string;
    popperOptions: Record<string, any>;
}> | import("vue").DefineComponent<{
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
}>, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color?: unknown;
    disabled?: unknown;
    modelValue?: unknown;
    arrow?: unknown;
    placement?: unknown;
    trigger?: unknown;
    offset?: unknown;
    popperOptions?: unknown;
    size?: unknown;
} & {
    color: string;
    size: string;
    modelValue: boolean;
    offset: number;
    placement: string;
    arrow: boolean;
    disabled: boolean;
    trigger: string | unknown[];
} & {
    popperOptions?: Record<string, any> | undefined;
}>, {
    color: string;
    size: string;
    modelValue: boolean;
    offset: number;
    placement: string;
    popperOptions: Record<string, any>;
    arrow: boolean;
    disabled: boolean;
    trigger: string | unknown[];
}>;
export default _default;
