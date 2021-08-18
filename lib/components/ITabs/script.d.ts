import { sizePropValidator } from '../../mixins';
import { Classes } from '../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The color variant of the header
     * @type primary | light | dark
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description Used to set the currently active tab
     * @type String
     * @default
     */
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description The size variant of the tabs
     * @type sm | md | lg
     * @default md
     */
    size: {
        type: StringConstructor;
        default: () => string;
        validator: typeof sizePropValidator;
    };
    /**
     * @description Display the tabs header as full width
     * @type Boolean
     * @default false
     */
    stretch: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, {
    active: string;
    tabs: never[];
}, {
    classes(): Classes;
}, {
    setActive(id: string): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color?: unknown;
    modelValue?: unknown;
    size?: unknown;
    stretch?: unknown;
} & {
    color: string;
    size: string;
    modelValue: string;
    stretch: boolean;
} & {}>, {
    color: string;
    size: string;
    modelValue: string;
    stretch: boolean;
}>;
export default _default;
