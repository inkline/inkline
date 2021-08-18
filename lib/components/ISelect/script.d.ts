import { sizePropValidator } from '../../mixins';
import { SelectOption } from './components/ISelectOption/script';
import { Classes, ElementEvent } from '../../types';
declare const _default: import("vue").DefineComponent<{
    /**
     * @description The duration of the hide and show animation
     * @type Number
     * @default 300
     */
    animationDuration: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description Enable autocomplete functionality
     * @type Boolean
     * @default false
     */
    autocomplete: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Displays an arrow on the dropdown pointing to the trigger element
     * @type Boolean
     * @default true
     */
    arrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The color variant of the select
     * @type light | dark
     * @default light
     */
    color: {
        type: StringConstructor;
        default: () => string;
    };
    /**
     * @description Display the select as clearable
     * @type Boolean
     * @default false
     */
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The disabled state of the select
     * @type Boolean
     * @default false
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The field to be used for identifying the options
     * @type String
     * @default id
     */
    idField: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description The keydown events bound to the trigger element
     * @type string[]
     * @default [up, down, enter, space, tab, esc]
     */
    keydownTrigger: {
        type: ArrayConstructor;
        default: () => string[];
    };
    /**
     * @description The keydown events bound to the select option elements
     * @type string[]
     * @default [up, down, enter, space, tab, esc]
     */
    keydownItem: {
        type: ArrayConstructor;
        default: () => string[];
    };
    /**
     * @description Used to extract the label from the select option and select value
     * @type String | Function
     * @default label
     */
    label: {
        type: (FunctionConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description The loading state of the select
     * @type Boolean
     * @default false
     */
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Used to set the field value
     * @type Object | String | Number
     * @default null
     */
    modelValue: {
        type: (ObjectConstructor | StringConstructor | NumberConstructor)[];
        default: null;
    };
    /**
     * @description The minimum input length to open the select dropdown at
     * @type Number
     * @default 0
     */
    minLength: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description The unique identifier of the select
     * @type String
     * @default uid()
     */
    name: {
        type: (StringConstructor | NumberConstructor)[];
        default: () => string;
    };
    /**
     * @description The options to be displayed in the select component
     * @type Array
     * @default []
     */
    options: {
        type: ArrayConstructor;
        default: () => SelectOption[];
    };
    /**
     * @description The placeholder of the select input
     * @type String
     * @default ''
     */
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description The offset of the dropdown relative to the trigger element
     * @type Number
     * @default 6
     */
    offset: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description The placement of the dropdown
     * @type top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end
     * @default false
     */
    placement: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description Used to override the popper.js options used for creating the dropdown
     * @type Object
     * @default {}
     */
    popperOptions: {
        type: ObjectConstructor;
        default: () => any;
    };
    /**
     * @description The readonly state of the select
     * @type Boolean
     * @default false
     */
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The number of pixels until scroll end before loading the next page
     * @type Number
     * @default 160
     */
    scrollTolerance: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description Selects the first option when pressing enter
     * @type Boolean
     * @default true
     */
    selectFirstOptionOnEnter: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description The size variant of the select
     * @type sm | md | lg
     * @default md
     */
    size: {
        type: StringConstructor;
        default: () => string;
        validator: typeof sizePropValidator;
    };
    /**
     * @description The tabindex of the select
     * @type Number | String
     * @default 1
     */
    tabindex: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    /**
     * @description The type of the select
     * @type String
     * @default text
     */
    type: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description The total number of options, used for infinite scrolling
     * @type Number
     * @default undefined
     */
    total: {
        type: NumberConstructor;
        default: undefined;
    };
}, unknown, {
    animating: boolean;
    visible: boolean;
    inputValue: string;
}, {
    wrapperClasses(): Classes;
    popupClasses(): Classes;
    tabIndex(): number | string;
    isClearable(): boolean;
    value(): any;
    inputPlaceholder(): string;
}, {
    /**
     * Event bindings
     *
     * Input event handlers for changing the value, clearing the value, clicking,
     * focusing and blurring the input elements.
     */
    onInput(option: SelectOption, label?: string | undefined): void;
    onClear(): void;
    onFocus(event: ElementEvent): void;
    onBlur(event: ElementEvent): void;
    onClick(): void;
    onClickOutside(): void;
    onCaretClick(): void;
    /**
     * Infinite scrolling
     *
     * Compute scroll offset, viewport height and total height and determine if next set of items needs to be loaded
     */
    onScroll(): void;
    onWindowResize(): void;
    /**
     * Accessibility
     *
     * Keyboard bindings for select input and select options
     */
    onTriggerKeyDown(event: KeyboardEvent): void;
    onItemKeyDown(event: KeyboardEvent): void;
    onEscape(): void;
    /**
     * Visibility
     *
     * Hide or show the select options menu
     */
    show(): void;
    hide(): void;
    /**
     * Helper methods
     */
    focus(): void;
    getFocusableItems(): HTMLElement[];
    getElementHeight(node: HTMLElement): number;
    inputMatchesLabel(value: string): boolean;
    inputMatchesLength(value: string): boolean;
    inputShouldShowSelect(value: string): boolean;
    computeLabel(option: SelectOption): string;
}, import("vue").DefineComponent<{}, {}, {}, {
    isDisabled(): boolean;
    isReadonly(): boolean;
    parent(): any;
    schema(): any;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}> | import("vue").DefineComponent<{
    /**
     * @description The duration of the hide and show animation
     * @type Number
     * @default 300
     */
    placement: {
        type: StringConstructor;
        default: import("@popperjs/core").Placement;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    popperOptions: {
        type: ObjectConstructor;
        default: () => {};
    };
}, unknown, {
    popperInstance?: import("@popperjs/core").Instance | undefined;
}, {}, {
    createPopper(): void;
    destroyPopper(): void; /**
     * @description The field to be used for identifying the options
     * @type String
     * @default id
     */
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    placement?: unknown;
    offset?: unknown;
    popperOptions?: unknown;
} & {
    offset: number;
    placement: string;
    popperOptions: Record<string, any>;
} & {}>, {
    offset: number;
    placement: string;
    popperOptions: Record<string, any>;
}>, import("vue").ComponentOptionsMixin, ("update:modelValue" | "search" | "pagination")[], "update:modelValue" | "search" | "pagination", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    animationDuration?: unknown;
    autocomplete?: unknown;
    arrow?: unknown;
    color?: unknown;
    clearable?: unknown;
    disabled?: unknown;
    idField?: unknown;
    keydownTrigger?: unknown;
    keydownItem?: unknown;
    label?: unknown;
    loading?: unknown;
    modelValue?: unknown;
    minLength?: unknown;
    name?: unknown;
    options?: unknown;
    placeholder?: unknown;
    offset?: unknown;
    placement?: unknown;
    popperOptions?: unknown;
    readonly?: unknown;
    scrollTolerance?: unknown;
    selectFirstOptionOnEnter?: unknown;
    size?: unknown;
    tabindex?: unknown;
    type?: unknown;
    total?: unknown;
} & {
    name: string | number;
    color: string;
    size: string;
    modelValue: null;
    offset: number;
    placement: string;
    arrow: boolean;
    options: unknown[];
    animationDuration: number;
    type: string;
    disabled: boolean;
    tabindex: string | number;
    loading: boolean;
    readonly: boolean;
    keydownTrigger: unknown[];
    keydownItem: unknown[];
    clearable: boolean;
    label: string | Function;
    autocomplete: boolean;
    idField: string;
    minLength: number;
    placeholder: string;
    scrollTolerance: number;
    selectFirstOptionOnEnter: boolean;
} & {
    popperOptions?: Record<string, any> | undefined;
    total?: number | undefined;
}>, {
    name: string | number;
    color: string;
    size: string;
    modelValue: null;
    offset: number;
    placement: string;
    popperOptions: Record<string, any>;
    arrow: boolean;
    options: unknown[];
    animationDuration: number;
    type: string;
    disabled: boolean;
    tabindex: string | number;
    loading: boolean;
    readonly: boolean;
    keydownTrigger: unknown[];
    keydownItem: unknown[];
    clearable: boolean;
    label: string | Function;
    autocomplete: boolean;
    idField: string;
    minLength: number;
    placeholder: string;
    scrollTolerance: number;
    selectFirstOptionOnEnter: boolean;
    total: number;
}>;
export default _default;
