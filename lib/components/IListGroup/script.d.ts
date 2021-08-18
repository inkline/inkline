import { sizePropValidator } from '../../mixins';
import { Classes } from '../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description Display the list group border
     * @type Boolean
     * @default true
     */
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The color variant of the list group
     * @type light | dark
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description The size variant of the list group
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
    border?: unknown;
    color?: unknown;
    size?: unknown;
} & {
    color: string;
    size: string;
    border: boolean;
} & {}>, {
    color: string;
    size: string;
    border: boolean;
}>;
export default _default;
