import { Classes } from '../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The color variant of the loader
     * @type primary | success | light | dark | info | success | warning | danger
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description The size variant of the loader
     * @type sm | md | lg | auto
     * @default md
     */
    size: {
        type: StringConstructor;
        default: () => string;
    };
}, unknown, unknown, {
    classes(): Classes;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color?: unknown;
    size?: unknown;
} & {
    color: string;
    size: string;
} & {}>, {
    color: string;
    size: string;
}>;
export default _default;
