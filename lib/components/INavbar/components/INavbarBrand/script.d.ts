declare const _default: import("vue").DefineComponent<{
    /**
     * @description Set the HTML tag to be used for rendering the nav item
     * @type String
     * @default div
     */
    tag: {
        type: StringConstructor;
        default: string;
    };
}, unknown, unknown, {}, {}, import("vue").DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
}, unknown, {
    routerComponent: string;
}, {
    isTag(): string;
    isComponent(): boolean;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    tag?: unknown;
} & {
    tag: string;
} & {}>, {
    tag: string;
}>;
export default _default;
