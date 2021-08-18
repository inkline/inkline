import { sizePropValidator } from '../../mixins';
import { Classes } from "../../types";
declare const _default: import("vue").DefineComponent<{
    /**
     * @description Display the button group with vertical orientation
     * @type Boolean
     * @default false
     */
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Display the button group as a block, spanning the full container width
     * @type Boolean
     * @default false
     */
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The disabled state of the button group
     * @type Boolean
     * @default false
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The size variant of the button group
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
    isDisabled(): boolean;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    vertical?: unknown;
    block?: unknown;
    disabled?: unknown;
    size?: unknown;
} & {
    size: string;
    disabled: boolean;
    block: boolean;
    vertical: boolean;
} & {}>, {
    size: string;
    disabled: boolean;
    block: boolean;
    vertical: boolean;
}>;
export default _default;
