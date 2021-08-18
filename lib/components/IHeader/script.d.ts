import { sizePropValidator } from '../../mixins';
import { Classes } from '../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The color variant of the header
     * @type primary | light | dark
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description Display the header background as cover, always covering the whole header width or height
     * @type Boolean
     * @default false
     */
    cover: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Display the inner content container as fluid, covering 100% of the header width
     * @type Boolean
     * @default false
     */
    fluid: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Display the header as fullscreen, covering 100% screen height and 100% screen width
     * @type Boolean
     * @default true
     */
    fullscreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The size variant of the header
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
    cover?: unknown;
    fluid?: unknown;
    fullscreen?: unknown;
    size?: unknown;
} & {
    color: string;
    size: string;
    fluid: boolean;
    cover: boolean;
    fullscreen: boolean;
} & {}>, {
    color: string;
    size: string;
    fluid: boolean;
    cover: boolean;
    fullscreen: boolean;
}>;
export default _default;
