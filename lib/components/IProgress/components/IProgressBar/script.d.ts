import { Classes, Styles } from '../../../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The color variant of the progress bar
     * @type light | dark | primary | secondary | info | success | warning | danger
     * @default primary
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description The value of the progress bar
     * @type Number
     * @default 0
     */
    value: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}, unknown, unknown, {
    computedValue(): number;
    min(): number;
    max(): number;
    style(): Styles;
    classes(): Classes;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color?: unknown;
    value?: unknown;
} & {
    value: string | number;
    color: string;
} & {}>, {
    value: string | number;
    color: string;
}>;
export default _default;
