import { Classes } from '../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description Display the table with borders
     * @type Boolean
     * @default false
     */
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Display the table rows as condensed
     * @type Boolean
     * @default false
     */
    condensed: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Display the table rows as alternating stripes
     * @type Boolean
     * @default false
     */
    striped: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Set the table rows as hoverable
     * @type Boolean
     * @default false
     */
    hover: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Set the table to be responsive, enabling horizontal scroll when overflowing the parent container
     * @type Boolean | xs | sm | md | lg | xl | xxl
     * @default false
     */
    responsive: {
        type: (BooleanConstructor | StringConstructor)[];
        default: boolean;
    };
    /**
     * @description Display the table rows without wrapping white-space
     * @type Boolean
     * @default false
     */
    nowrap: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The color variant of the table
     * @type primary | success | light | dark | info | success | warning | danger
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
}, unknown, unknown, {
    classes(): Classes;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    border?: unknown;
    condensed?: unknown;
    striped?: unknown;
    hover?: unknown;
    responsive?: unknown;
    nowrap?: unknown;
    color?: unknown;
} & {
    color: string;
    border: boolean;
    hover: boolean;
    condensed: boolean;
    striped: boolean;
    responsive: string | boolean;
    nowrap: boolean;
} & {}>, {
    color: string;
    border: boolean;
    hover: boolean;
    condensed: boolean;
    striped: boolean;
    responsive: string | boolean;
    nowrap: boolean;
}>;
export default _default;
