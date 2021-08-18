import { sizePropValidator } from '../../mixins';
import { Classes } from '../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description Determines if the sidebar should close when clicking a sidebar item
     * @type Boolean
     * @default true
     */
    collapseOnItemClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Determines if the sidebar should close when clicking outside, on the overlay
     * @type Boolean
     * @default true
     */
    collapseOnClickOutside: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The collapse position of the sidebar
     * @type fixed | absolute | relative
     * @default absolute
     */
    collapsePosition: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description The color variant of the sidebar
     * @type light | dark
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description The placement of the sidebar
     * @type left | right
     * @default left
     */
    placement: {
        type: StringConstructor;
        default: string;
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
}, unknown, unknown, {
    classes(): Classes;
    sidebarWrapperTransition(): string;
    sidebarTransition(): string;
}, {
    onItemClick(): void;
    onOverlayClick(): void;
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
    collapsibleClasses(): Classes;
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
    collapsePosition?: unknown;
    color?: unknown;
    placement?: unknown;
    size?: unknown;
} & {
    color: string;
    size: string;
    placement: string;
    collapseOnItemClick: boolean;
    collapseOnClickOutside: boolean;
    collapsePosition: string;
} & {}>, {
    color: string;
    size: string;
    placement: string;
    collapseOnItemClick: boolean;
    collapseOnClickOutside: boolean;
    collapsePosition: string;
}>;
export default _default;
