import { Classes } from '../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The animation of the hamburger menu
     * @type close | arrow-up | arrow-down | arrow-left | arrow-right | plus | minus
     * @default close
     */
    animation: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description The color variant of the hamburger menu
     * @type light | dark
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description Used to set the hamburger menu as opened or closed
     * @type Boolean
     * @default false
     */
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, unknown, {
    classes(): Classes;
}, {
    onClick(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    animation?: unknown;
    color?: unknown;
    modelValue?: unknown;
} & {
    color: string;
    modelValue: boolean;
    animation: string;
} & {}>, {
    color: string;
    modelValue: boolean;
    animation: string;
}>;
export default _default;
