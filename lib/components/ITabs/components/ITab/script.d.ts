import { Classes } from '../../../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The title of the tab
     * @type String
     * @default
     */
    title: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description The name of the tab, used as an identifier
     * @type String
     * @default uid()
     */
    name: {
        type: StringConstructor;
        default(): string;
    };
}, unknown, unknown, {
    active(): boolean;
    classes(): Classes;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    title?: unknown;
    name?: unknown;
} & {
    name: string;
    title: string;
} & {}>, {
    name: string;
    title: string;
}>;
export default _default;
