import { VNode } from 'vue';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The icon to be displayed
     * @type String
     * @default
     */
    name: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description The size variant of the icon
     * @type sm | md | lg
     * @default md
     */
    size: {
        type: StringConstructor;
        default: string;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    name: string;
    size: string;
} & {}>, {
    name: string;
    size: string;
}>;
export default _default;
