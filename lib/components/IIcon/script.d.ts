import { sizePropValidator } from '../../mixins';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The size variant of the icon
     * @type sm | md | lg
     * @default md
     */
    size: {
        type: StringConstructor;
        default: () => string;
        validator: typeof sizePropValidator;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    size?: unknown;
} & {
    size: string;
} & {}>, {
    size: string;
}>;
export default _default;
