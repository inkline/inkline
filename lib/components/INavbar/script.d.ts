import { sizePropValidator } from '../../mixins';
import { Classes } from '../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description Determines if the navbar should close when clicking a navbar item
     * @type Boolean
     * @default true
     */
    collapseOnItemClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Determines if the navbar should close when clicking outside
     * @type Boolean
     * @default true
     */
    collapseOnClickOutside: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The color variant of the navbar
     * @type light | dark
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description Display the inner container as fluid, spanning 100% width
     * @type Boolean
     * @default false
     */
    fluid: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The size variant of the navbar
     * @type sm | md | lg
     * @default md
     */
    size: {
        type: StringConstructor;
        default: () => string;
        validator: typeof sizePropValidator;
    };
    /**
     * @description The animation of the hamburger menu component used for collapsing
     * @type close | arrow-up | arrow-down | arrow-left | arrow-right | plus | minus
     * @default close
     */
    menuAnimation: {
        type: StringConstructor;
        default: string;
    };
}, unknown, unknown, {
    classes(): Classes;
}, {
    onItemClick(): void;
    onClickOutside(): void;
}, import("vue").DefineComponent<{
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
    collapsibleClasses(): Classes; /**
     * @description Determines if the navbar should close when clicking a navbar item
     * @type Boolean
     * @default true
     */
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
}>, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    collapseOnItemClick?: unknown;
    collapseOnClickOutside?: unknown;
    color?: unknown;
    fluid?: unknown;
    size?: unknown;
    menuAnimation?: unknown;
} & {
    color: string;
    size: string;
    fluid: boolean;
    collapseOnItemClick: boolean;
    collapseOnClickOutside: boolean;
    menuAnimation: string;
} & {}>, {
    color: string;
    size: string;
    fluid: boolean;
    collapseOnItemClick: boolean;
    collapseOnClickOutside: boolean;
    menuAnimation: string;
}>;
export default _default;
