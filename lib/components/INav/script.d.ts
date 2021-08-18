import { sizePropValidator } from '../../mixins';
import { Classes } from '../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The color variant of the nav
     * @type light | dark
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description The size variant of the nav
     * @type sm | md | lg
     * @default md
     */
    size: {
        type: StringConstructor;
        default: () => string;
        validator: typeof sizePropValidator;
    };
    /**
     * @description Display the nav with vertical orientation
     * @type Boolean
     * @default false
     */
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, unknown, {
    classes(): Classes;
}, {
    onItemClick(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color?: unknown;
    size?: unknown;
    vertical?: unknown;
} & {
    color: string;
    size: string;
    vertical: boolean;
} & {}>, {
    color: string;
    size: string;
    vertical: boolean;
}>;
export default _default;
