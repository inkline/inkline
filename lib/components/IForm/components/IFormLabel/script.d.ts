import { sizePropValidator } from '../../../../mixins';
import { Classes } from '../../../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The id of the target input to be focused by the form label. If left empty, clicking the form label will focus the next sibling input
     * @type String
     * @default
     */
    for: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description The placement of the form label
     * @type left | right
     * @default left
     */
    placement: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description The size variant of the form label
     * @type sm | md | lg
     * @default md
     */
    size: {
        type: StringConstructor;
        default: () => string;
        validator: typeof sizePropValidator;
    };
}, unknown, unknown, {
    classes(): Classes;
}, {
    getNextSibling(): HTMLElement;
    onClick(): void;
}, import("vue").DefineComponent<{}, {}, {}, {
    isDisabled(): boolean; /**
     * @description The id of the target input to be focused by the form label. If left empty, clicking the form label will focus the next sibling input
     * @type String
     * @default
     */
    isReadonly(): boolean;
    parent(): any;
    schema(): any;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    for?: unknown;
    placement?: unknown;
    size?: unknown;
} & {
    size: string;
    placement: string;
    for: string;
} & {}>, {
    size: string;
    placement: string;
    for: string;
}>;
export default _default;
