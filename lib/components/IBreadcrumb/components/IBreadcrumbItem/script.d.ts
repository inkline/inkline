import { Classes } from '../../../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The active state of the breadcrumb item
     * @type Boolean
     * @default false
     */
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The disabled state of the breadcrumb item
     * @type Boolean
     * @default false
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The tabindex of the breadcrumb item
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
    disabled?: unknown;
    tabindex?: unknown;
} & {
    disabled: boolean;
    active: boolean;
    tabindex: string | number;
} & {}>, {
    disabled: boolean;
    active: boolean;
    tabindex: string | number;
}>;
export default _default;
