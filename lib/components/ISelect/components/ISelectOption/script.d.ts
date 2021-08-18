import { Classes } from "../../../../types";
/**
 * @name default
 * @kind slot
 * @description Slot for default select option content
 */
export interface SelectOption {
    active?: boolean;
    disabled?: boolean;
    label: string;
    value: any;
    [key: string]: any;
}
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The active state of the select option
     * @type Boolean
     * @default false
     */
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The disabled state of the select option
     * @type Boolean
     * @default false
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The label of the select option
     * @type String
     * @default ''
     */
    label: {
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
    /**
     * @description The select option value
     * @type Object | String | Number
     * @default {}
     */
    value: {
        type: (ObjectConstructor | StringConstructor | NumberConstructor)[];
        default: () => any;
    };
}, unknown, unknown, {
    isActive(): boolean;
    classes(): Classes;
    tabIndex(): number | string;
}, {
    onClick(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    active?: unknown;
    disabled?: unknown;
    label?: unknown;
    tabindex?: unknown;
    value?: unknown;
} & {
    disabled: boolean;
    active: boolean;
    tabindex: string | number;
    label: string;
} & {
    value?: any;
}>, {
    value: any;
    disabled: boolean;
    active: boolean;
    tabindex: string | number;
    label: string;
}>;
export default _default;
