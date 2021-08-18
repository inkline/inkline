import { Classes, ElementEvent } from '../../../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The active state of the nav item
     * @type Boolean
     * @default false
     */
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The disabled state of the nav item
     * @type Boolean
     * @default false
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Set the HTML tag to be used for rendering the nav item
     * @type String
     * @default div
     */
    tag: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description The tabindex of the list group item
     * @type Number | String
     * @default 1
     */
    tabindex: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}, unknown, unknown, {
    classes(): Classes;
    tabIndex(): number | string;
}, {
    onClick(event: ElementEvent): void;
}, import("vue").DefineComponent<{
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
    disabled?: unknown;
    tag?: unknown;
    tabindex?: unknown;
} & {
    tag: string;
    disabled: boolean;
    active: boolean;
    tabindex: string | number;
} & {}>, {
    tag: string;
    disabled: boolean;
    active: boolean;
    tabindex: string | number;
}>;
export default _default;
