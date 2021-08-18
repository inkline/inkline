import { Classes } from '../../../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The unique identifier of the collapsible item, used for determining if the item is open or not
     * @type String
     * @default uid()
     */
    name: {
        type: StringConstructor;
        default(): string;
    };
    /**
     * @description The title of the collapsible item
     * @type String
     */
    title: {
        type: StringConstructor;
        default: string;
    };
}, unknown, unknown, {
    active(): boolean;
    classes(): Classes;
}, {
    onClick(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    name?: unknown;
    title?: unknown;
} & {
    name: string;
    title: string;
} & {}>, {
    name: string;
    title: string;
}>;
export default _default;
