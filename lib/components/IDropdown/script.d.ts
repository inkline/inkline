import { sizePropValidator } from '../../mixins';
import { Classes } from '../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The duration of the hide and show animation
     * @type Number
     * @default 300
     */
    animationDuration: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description The color variant of the dropdown
     * @type light | dark
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description The disabled state of the dropdown
     * @type Boolean
     * @default false
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Used to hide the dropdown when clicking or selecting a dropdown item
     * @type Boolean
     * @default false
     */
    hideOnItemClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The keydown events bound to the trigger element
     * @type string[]
     * @default [up, down, enter, space, tab, esc]
     */
    keydownTrigger: {
        type: ArrayConstructor;
        default: () => string[];
    };
    /**
     * @description The keydown events bound to the dropdown item elements
     * @type string[]
     * @default [up, down, enter, space, tab, esc]
     */
    keydownItem: {
        type: ArrayConstructor;
        default: () => string[];
    };
    /**
     * @description Used to manually control the visibility of the dropdown
     * @type Boolean
     * @default false
     */
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Displays an arrow on the dropdown pointing to the trigger element
     * @type Boolean
     * @default true
     */
    arrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The placement of the dropdown
     * @type top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end
     * @default false
     */
    placement: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description The events used to trigger the dropdown
     * @type hover | focus | click | manual
     * @default [click]
     */
    trigger: {
        type: (ArrayConstructor | StringConstructor)[];
        default: () => string[];
    };
    /**
     * @description The offset of the dropdown relative to the trigger element
     * @type Number
     * @default 6
     */
    offset: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description Used to override the popper.js options used for creating the dropdown
     * @type Object
     * @default {}
     */
    popperOptions: {
        type: ObjectConstructor;
        default: () => any;
    };
    /**
     * @description The size variant of the dropdown
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
    getFocusableItems(): HTMLElement[];
    onTriggerKeyDown(event: KeyboardEvent): void;
    onItemKeyDown(event: KeyboardEvent): void;
    onItemClick(): void;
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
    popperInstance?: import("@popperjs/core").Instance | undefined;
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
    animationDuration?: unknown;
    color?: unknown;
    disabled?: unknown;
    hideOnItemClick?: unknown;
    keydownTrigger?: unknown;
    keydownItem?: unknown;
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
    animationDuration: number;
    disabled: boolean;
    trigger: string | unknown[];
    hideOnItemClick: boolean;
    keydownTrigger: unknown[];
    keydownItem: unknown[];
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
    animationDuration: number;
    disabled: boolean;
    trigger: string | unknown[];
    hideOnItemClick: boolean;
    keydownTrigger: unknown[];
    keydownItem: unknown[];
}>;
export default _default;
