import { sizePropValidator } from '../../mixins';
import { Classes } from "../../types";
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The active state of the button
     * @type Boolean
     * @default false
     */
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Display the button as a block, spanning the full container width
     * @type Boolean
     * @default false
     */
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Display the button as a circle
     * @type Boolean
     * @default false
     */
    circle: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The color variant of the button
     * @type primary | success | light | dark | info | success | warning | danger | facebook | google | twitter | github
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description The disabled state of the button
     * @type Boolean
     * @default false
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Display the button as a link
     * @type Boolean
     * @default false
     */
    link: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The loading state of the button
     * @type Boolean
     * @default false
     */
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Display the button as an outline button
     * @type Boolean
     * @default false
     */
    outline: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Set the HTML tag to be used for rendering the button
     * @type String
     * @default button
     */
    tag: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description The tabindex of the button
     * @type Number | String
     * @default 1
     */
    tabindex: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    /**
     * @description The size variant of the button
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
    isDisabled(): boolean;
    tabIndex(): number | string;
}, {}, import("vue").DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, unknown, {
    routerComponent: string;
}, {
    isTag(): string;
    isComponent(): boolean;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    active?: unknown;
    block?: unknown;
    circle?: unknown;
    color?: unknown;
    disabled?: unknown;
    link?: unknown;
    loading?: unknown;
    outline?: unknown;
    tag?: unknown;
    tabindex?: unknown;
    size?: unknown;
} & {
    color: string;
    size: string;
    tag: string;
    outline: boolean;
    disabled: boolean;
    active: boolean;
    tabindex: string | number;
    block: boolean;
    circle: boolean;
    link: boolean;
    loading: boolean;
} & {}>, {
    color: string;
    size: string;
    tag: string;
    outline: boolean;
    disabled: boolean;
    active: boolean;
    tabindex: string | number;
    block: boolean;
    circle: boolean;
    link: boolean;
    loading: boolean;
}>;
export default _default;
