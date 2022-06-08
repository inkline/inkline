/* eslint-disable no-case-declarations */

import { defineComponent } from 'vue';
import {
    isFocusable,
    isFunction,
    isKey,
    uid,
    getValueByPath
} from '@inkline/inkline/helpers';
import {
    colorVariantClass,
    defaultPropValue,
    sizePropValidator,
    FormComponentMixin,
    PopupMixin
} from '@inkline/inkline/mixins';
import {
    useBaseModifiers,
    sameWidthModifier
} from '@inkline/inkline/mixins/PopupMixin';
import { ClickOutside } from '@inkline/inkline/directives';
import IInput from '@inkline/inkline/components/IInput/index.vue';
import IIcon from '@inkline/inkline/components/IIcon/index.vue';
import IMark from '@inkline/inkline/components/IMark/index.vue';
import ISelectOption from '@inkline/inkline/components/ISelect/components/ISelectOption/index.vue';
import { SelectOption } from '@inkline/inkline/components/ISelect/components/ISelectOption/script';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for the select prefix content
 * @name prefix
 * @kind slot
 */

/**
 * Slot for the select suffix content
 * @name suffix
 * @kind slot
 */

/**
 * Slot for the select prepend content
 * @name prepend
 * @kind slot
 */

/**
 * Slot for the select append content
 * @name append
 * @kind slot
 */

/**
 * Slot for the clearable button
 * @name clearable
 * @kind slot
 * @property clear
 */

const componentName = 'ISelect';

export default defineComponent({
    name: componentName,
    directives: {
        ClickOutside
    },
    components: {
        IInput,
        IIcon,
        ISelectOption,
        IMark
    },
    mixins: [
        FormComponentMixin,
        PopupMixin
    ],
    provide () {
        return {
            select: this
        };
    },
    props: {
        /**
         * The duration of the hide and show animation
         * @type Number
         * @default 300
         * @name animationDuration
         */
        animationDuration: {
            type: Number,
            default: 300
        },
        /**
         * Enable autocomplete functionality
         * @type Boolean
         * @default false
         * @name autocomplete
         */
        autocomplete: {
            type: Boolean,
            default: false
        },
        /**
         * Displays an arrow on the dropdown pointing to the trigger element
         * @type Boolean
         * @default true
         * @name arrow
         */
        arrow: {
            type: Boolean,
            default: true
        },
        /**
         * The color variant of the select
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * Display the select as clearable
         * @type Boolean
         * @default false
         * @name clearable
         */
        clearable: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the select
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The field to be used for identifying the options
         * @type String
         * @default id
         * @name idField
         */
        idField: {
            type: String,
            default: 'id'
        },
        /**
         * The keydown events bound to the trigger element
         * @type string[]
         * @default [up, down, enter, space, tab, esc]
         * @name keydownTrigger
         */
        keydownTrigger: {
            type: Array,
            default: (): string[] => ['up', 'down', 'enter', 'space', 'tab', 'esc']
        },
        /**
         * The keydown events bound to the select option elements
         * @type string[]
         * @default [up, down, enter, space, tab, esc]
         * @name keydownItem
         */
        keydownItem: {
            type: Array,
            default: (): string[] => ['up', 'down', 'enter', 'space', 'tab', 'esc']
        },
        /**
         * Used to extract the label from the select option and select value
         * @type String | Function
         * @default label
         * @name label
         */
        label: {
            type: [String, Function],
            default: 'label'
        },
        /**
         * The loading state of the select
         * @type Boolean
         * @default false
         * @name loading
         */
        loading: {
            type: Boolean,
            default: false
        },
        /**
         * Used to set the field value
         * @type Object | String | Number
         * @default null
         * @name modelValue
         */
        modelValue: {
            type: [Object, String, Number],
            default: null
        },
        /**
         * The minimum input length to open the select dropdown at
         * @type Number
         * @default 0
         * @name minLength
         */
        minLength: {
            type: Number,
            default: 0
        },
        /**
         * The unique identifier of the select
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: [String, Number],
            default: (): string => uid('select')
        },
        /**
         * The options to be displayed in the select component
         * @type Array
         * @default []
         * @name options
         */
        options: {
            type: Array,
            default: (): SelectOption[] => []
        },
        /**
         * The placeholder of the select input
         * @type String
         * @default ''
         * @name placeholder
         */
        placeholder: {
            type: String,
            default: ''
        },
        /**
         * The offset of the dropdown relative to the trigger element
         * @type Number
         * @default 6
         * @name offset
         */
        offset: {
            type: Number,
            default: 6
        },
        /**
         * The placement of the dropdown
         * @type top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end
         * @default false
         * @name placement
         */
        placement: {
            type: String,
            default: 'bottom'
        },
        /**
         * Used to override the popper.js options used for creating the dropdown
         * @type Object
         * @default {}
         * @name popperOptions
         */
        popperOptions: {
            type: Object,
            default: (): any => ({
                modifiers: [
                    ...useBaseModifiers({ offset: 8 }),
                    sameWidthModifier()
                ]
            })
        },
        /**
         * The readonly state of the select
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The number of pixels until scroll end before loading the next page
         * @type Number
         * @default 160
         * @name scrollTolerance
         */
        scrollTolerance: {
            type: Number,
            default: 160
        },
        /**
         * Selects the first option when pressing enter
         * @type Boolean
         * @default true
         * @name selectFirstOptionOnEnter
         */
        selectFirstOptionOnEnter: {
            type: Boolean,
            default: true
        },
        /**
         * The size variant of the select
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        },
        /**
         * The tabindex of the select
         * @type Number | String
         * @default 0
         * @name tabindex
         */
        tabindex: {
            type: [Number, String],
            default: 0
        },
        /**
         * The type of the select
         * @type String
         * @default text
         * @name type
         */
        type: {
            type: String,
            default: 'text'
        },
        /**
         * The total number of options, used for infinite scrolling
         * @type Number
         * @default undefined
         * @name total
         */
        total: {
            type: Number,
            default: undefined
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue',
        /**
         * Event emitted when input value changes
         * @event search
         */
        'search',
        /**
         * Event emitted when the next page needs to be loaded
         * @event pagination
         */
        'pagination'
    ],
    data (): { animating: boolean; visible: boolean; inputValue: string; } {
        return {
            animating: false,
            visible: false,
            inputValue: this.computeLabel(this.modelValue) || ''
        };
    },
    computed: {
        wrapperClasses (): Classes {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size)
            };
        },
        popupClasses (): Classes {
            return {
                '-disabled': this.isDisabled,
                '-readonly': this.isReadonly
            };
        },
        tabIndex (): number | string {
            return this.isDisabled ? -1 : this.tabindex;
        },
        isClearable (): boolean {
            return this.value && this.clearable && !this.isDisabled && !this.isReadonly;
        },
        value (): any {
            if (this.schema) {
                return this.schema.value;
            }

            return this.modelValue;
        },
        inputPlaceholder (): string {
            return this.value ? this.computeLabel(this.value) : this.placeholder;
        }
    },
    watch: {
        value (value) {
            this.inputValue = this.computeLabel(value);
        },
        inputValue (value) {
            const matchesLength = this.inputMatchesLength(value);
            const matchesLabel = this.inputMatchesLabel(value);

            if (matchesLength && !matchesLabel && !this.animating) {
                this.show();
            }

            this.$emit('search', this.inputValue);
        },
        options () {
            if (this.visible) {
                this.createPopper();
            }
        }
    },
    methods: {
        /**
         * Event bindings
         *
         * Input event handlers for changing the value, clearing the value, clicking,
         * focusing and blurring the input elements.
         */

        onInput (option: SelectOption, label?: string) {
            if (option.disabled) {
                return;
            }

            this.hide();

            if (label) {
                this.inputValue = label;
            }

            this.parent.onInput?.(this.name, option);
            this.$emit('update:modelValue', option);
        },
        onClear () {
            this.animating = true;
            this.$emit('update:modelValue', null);
            this.$nextTick(() => { this.animating = false; });
        },
        onFocus (event: MouseEvent) {
            // If there is no value and there are no default options,
            // do not open select
            if (!this.value && this.options.length === 0) {
                return;
            }

            if (this.autocomplete) {
                this.inputValue = '';
            }

            const focusShouldShowSelect = !event.relatedTarget ||
                !(this as any).$refs.wrapper.contains(event.relatedTarget);

            if (focusShouldShowSelect && this.inputShouldShowSelect(this.inputValue)) {
                this.show();
            }
        },
        onBlur (event: MouseEvent) {
            const blurShouldHideSelect = !event.relatedTarget ||
                !(this as any).$refs.wrapper.contains(event.relatedTarget);

            if (blurShouldHideSelect) {
                this.hide();
                this.inputValue = this.computeLabel(this.value);
            }

            this.parent.onBlur?.(this.name, event);
        },
        onClick () {
            if (this.autocomplete) {
                this.inputValue = '';
            }

            if (this.inputShouldShowSelect(this.inputValue)) {
                this.show();
            }
        },
        onClickOutside () {
            this.hide();
        },
        onClickCaret (event: MouseEvent) {
            if (this.visible) {
                this.onBlur(event);
            } else {
                this.focus();
                this.onFocus(event);
            }

            event.preventDefault();
            event.stopPropagation();
        },

        /**
         * Infinite scrolling
         *
         * Compute scroll offset, viewport height and total height and determine if next set of items needs to be loaded
         */

        onScroll () {
            if (isNaN(this.total as any)) {
                return;
            }

            const scrollTop = (this as any).$refs.body.scrollTop;
            const viewportHeight = parseInt(getComputedStyle((this as any).$refs.body).height, 10);
            const totalHeight = parseInt(getComputedStyle((this as any).$refs.options).height, 10);

            const shouldLoadNextPage = scrollTop + viewportHeight > totalHeight - this.scrollTolerance;
            const endReached = this.options.length >= (this.total as number);

            if (shouldLoadNextPage && !endReached && this.options.length > 0 && !this.loading) {
                this.$emit('pagination');
            }
        },
        onWindowResize () {
            this.onScroll();

            if (this.visible) {
                this.$nextTick().then(() => this.createPopper());
            }
        },

        /**
         * Accessibility
         *
         * Keyboard bindings for select input and select options
         */

        onTriggerKeyDown (event: KeyboardEvent) {
            if (this.keydownTrigger.length === 0) {
                return;
            }

            const focusableItems = this.getFocusableItems();
            const activeIndex = focusableItems.findIndex((item: any) => item.active);
            const initialIndex = activeIndex > -1 ? activeIndex : 0;
            const focusTarget = focusableItems[initialIndex];

            switch (true) {
            case isKey('up', event) && this.keydownTrigger.includes('up'):
            case isKey('down', event) && this.keydownTrigger.includes('down'):
                this.show();

                setTimeout(() => {
                    focusTarget.focus();
                }, this.visible ? 0 : this.animationDuration);

                event.preventDefault();
                event.stopPropagation();
                break;

            case isKey('enter', event) && this.keydownTrigger.includes('enter'):
                if (this.selectFirstOptionOnEnter && (!this.value || !this.inputMatchesLabel(this.inputValue))) {
                    const firstAvailableOption = this.options.find((option: any) => !option.disabled) as SelectOption;

                    if (firstAvailableOption) {
                        this.onInput(firstAvailableOption);
                        this.focus();
                    }
                } else {
                    this.onClick();
                }

                if (!this.visible) {
                    setTimeout(() => {
                        focusTarget.focus();
                    }, this.animationDuration);
                }

                event.preventDefault();
                break;

            case isKey('tab', event) && this.keydownTrigger.includes('tab'):
            case isKey('esc', event) && this.keydownTrigger.includes('esc'):
                this.hide();
                break;
            }
        },
        onItemKeyDown (event: KeyboardEvent) {
            if (this.keydownItem.length === 0) {
                return;
            }

            switch (true) {
            case isKey('up', event) && this.keydownItem.includes('up'):
            case isKey('down', event) && this.keydownItem.includes('down'):
                const focusableItems = this.getFocusableItems();

                const currentIndex = focusableItems.findIndex((item) => item === event.target);
                const maxIndex = focusableItems.length - 1;
                let nextIndex;

                if (isKey('up', event)) {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
                } else {
                    nextIndex = currentIndex < maxIndex ? currentIndex + 1 : maxIndex;
                }

                focusableItems[nextIndex].focus();

                event.preventDefault();
                event.stopPropagation();
                break;

            case isKey('enter', event) && this.keydownItem.includes('enter'):
            case isKey('space', event) && this.keydownItem.includes('space'):
                (event as any).target.click();

                this.focus();

                event.preventDefault();
                break;

            case isKey('tab', event) && this.keydownItem.includes('tab'):
            case isKey('esc', event) && this.keydownItem.includes('esc'):
                this.hide();
                this.focus();

                event.preventDefault();
                break;
            }
        },
        onEscape () {
            this.hide();
        },

        /**
         * Visibility
         *
         * Hide or show the select options menu
         */

        show () {
            if (this.isDisabled || this.isReadonly || this.visible) {
                return;
            }

            this.visible = true;
            this.createPopper();
        },
        hide () {
            if (!this.visible) {
                return;
            }

            this.visible = false;
            this.animating = true;

            setTimeout(() => {
                this.animating = false;
            }, this.animationDuration);
        },

        /**
         * Helper methods
         */

        focus () {
            (this as any).$refs.trigger.focus();
        },
        getFocusableItems (): HTMLElement[] {
            const focusableItems = [];

            for (const child of (this as any).$refs.options.children) {
                if (isFocusable(child)) {
                    focusableItems.push(child);
                }
            }

            return focusableItems;
        },
        getElementHeight (node: HTMLElement): number {
            const computedStyle = getComputedStyle(node);

            if (!computedStyle.height) {
                return NaN;
            }

            return Math.ceil(parseFloat(computedStyle.height));
        },
        inputMatchesLabel (value: string): boolean {
            return this.value && value === this.computeLabel(this.value);
        },
        inputMatchesLength (value: string): boolean {
            return this.minLength === 0 || ((value as any) && value.length >= this.minLength);
        },
        inputShouldShowSelect (value: string): boolean {
            if (!this.autocomplete) {
                return true;
            }

            return this.inputMatchesLength(value) && !this.inputMatchesLabel(value);
        },
        computeLabel (option: SelectOption): string {
            if (typeof option !== 'object') {
                return this.inputValue;
            }

            return isFunction(this.label)
                ? (this.label as any)(option)
                : getValueByPath(option, this.label as string);
        }
    }
});
