import { sizePropValidator } from '../../mixins';
import { Classes } from '../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description Display the collapsible as an accordion, keeping a maximum of one open collapsible item
     * @type Boolean
     * @default false
     */
    accordion: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The color variant of the button
     * @type light | dark | blank
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description The size variant of the collapsible
     * @type sm | md | lg
     * @default md
     */
    size: {
        type: StringConstructor;
        default: () => string;
        validator: typeof sizePropValidator;
    };
    /**
     * @description Used to determine which collapsible item is open
     * @type String[]
     * @default
     */
    modelValue: {
        type: ArrayConstructor;
        default: () => any[];
    };
}, unknown, {
    activeItems: any[];
}, {
    classes(): Classes;
}, {
    onItemClick(item: any): any[] | undefined;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    accordion?: unknown;
    color?: unknown;
    size?: unknown;
    modelValue?: unknown;
} & {
    color: string;
    size: string;
    modelValue: unknown[];
    accordion: boolean;
} & {}>, {
    color: string;
    size: string;
    modelValue: unknown[];
    accordion: boolean;
}>;
export default _default;
