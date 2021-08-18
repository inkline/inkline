import { sizePropValidator } from '../../mixins';
import { Classes } from "../../types";
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The color variant of the progress component
     * @type light | dark
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description The value to consider as the 0% starting point
     * @type Number
     * @default 0
     */
    min: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    /**
     * @description The value to consider as the 100% ending point
     * @type Number
     * @default 100
     */
    max: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    /**
     * @description The size variant of the progress component
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
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color?: unknown;
    min?: unknown;
    max?: unknown;
    size?: unknown;
} & {
    color: string;
    size: string;
    min: string | number;
    max: string | number;
} & {}>, {
    color: string;
    size: string;
    min: string | number;
    max: string | number;
}>;
export default _default;
