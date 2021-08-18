import { Classes } from '../../../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The name of the referenced tab
     * @type String
     * @default
     */
    for: {
        type: StringConstructor;
        default(): string;
    };
}, unknown, unknown, {
    active(): boolean;
    classes(): Classes;
    name(): string;
}, {
    onClick(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    for?: unknown;
} & {
    for: string;
} & {}>, {
    for: string;
}>;
export default _default;
