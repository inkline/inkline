import { Classes } from '../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description Display the container as fluid, always spanning 100% width
     * @type Boolean
     * @default false
     */
    fluid: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, unknown, {
    classes(): Classes;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    fluid?: unknown;
} & {
    fluid: boolean;
} & {}>, {
    fluid: boolean;
}>;
export default _default;
