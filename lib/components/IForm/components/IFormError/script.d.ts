declare const _default: import("vue").DefineComponent<{
    /**
     * @description The schema path of the target input to show the errors for.
     * @type String
     * @default
     */
    for: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description Set the validation statuses for which the form error should be visible.
     * @type Array | String
     * @default ['touched', 'dirty', 'invalid']
     */
    visible: {
        type: (ArrayConstructor | StringConstructor)[];
        default: () => string[];
    };
}, unknown, unknown, {
    parent(): any;
    schema(): any;
    errors(): any;
    isVisible(): boolean;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    for?: unknown;
    visible?: unknown;
} & {
    visible: string | unknown[];
    for: string;
} & {}>, {
    visible: string | unknown[];
    for: string;
}>;
export default _default;
