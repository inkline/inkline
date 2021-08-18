import { MarkSearchStringPart } from '../../helpers';
declare const _default: import("vue").DefineComponent<{
    text: {
        type: StringConstructor;
        default: string;
    };
    query: {
        type: StringConstructor;
        default: string;
    };
}, unknown, unknown, {
    parts(): MarkSearchStringPart[];
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    text?: unknown;
    query?: unknown;
} & {
    text: string;
    query: string;
} & {}>, {
    text: string;
    query: string;
}>;
export default _default;
