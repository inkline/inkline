import {
    isFocusable,
    isFunction,
    isKey,
    uid
} from '@inkline/inkline/src/helpers';
import {
    colorVariantClass,
    sizePropValidator,
    FormComponentMixin,
    PopupMixin,
} from '@inkline/inkline/src/mixins';
import {
    useBaseModifiers,
    sameWidthModifier
} from "@inkline/inkline/src/mixins/PopupMixin";
import { ClickOutside } from '@inkline/inkline/src/directives';
import IInput from '@inkline/inkline/src/components/IInput/index.vue';
import IIcon from '@inkline/inkline/src/components/IIcon/index.vue';
import ISelectOption from '@inkline/inkline/src/components/ISelect/components/ISelectOption/index.vue';
import IMark from '@inkline/inkline/src/components/IMark/index.vue';
import { getValueByPath } from "@inkline/inkline/src/helpers";

/**
 * @name prefix
 * @kind slot
 * @description Slot for the select prefix content
 */

/**
 * @name suffix
 * @kind slot
 * @description Slot for the select suffix content
 */

/**
 * @name prepend
 * @kind slot
 * @description Slot for the select prepend content
 */

/**
 * @name append
 * @kind slot
 * @description Slot for the select append content
 */

/**
 * @name clearable
 * @kind slot
 * @description Slot for the clearable button
 * @property clear
 */

export default {
    name: 'ISelect',
    mixins: [
        FormComponentMixin,
        PopupMixin
    ],
    directives: {
        ClickOutside
    },
    components: {
        IInput,
        IIcon,
        ISelectOption,
        IMark
    },
    provide() {
        return {
            select: this
        };
    },
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
         */
        'update:modelValue',
        /**
         * @event search
         * @description Event emitted when input value changes
         */
        'search',
        /**
         * @event pagination
         * @description Event emitted when the next page needs to be loaded
         */
        'pagination'
    ],
    props: {
        /**
         * @description The duration of the hide and show animation
         * @type Number
         * @default 300
         */
        animationDuration: {
            type: Number,
            default: 300
        },
        /**
         * @description Enable autocomplete functionality
         * @type Boolean
         * @default false
         */
        autocomplete: {
            type: Boolean,
            default: false
        },
        /**
         * @description Displays an arrow on the dropdown pointing to the trigger element
         * @type Boolean
         * @default true
         */
        arrow: {
            type: Boolean,
            default: true
        },
        /**
         * @description The color variant of the select
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * @description Display the select as clearable
         * @type Boolean
         * @default false
         */
        clearable: {
            type: Boolean,
            default: false
        },
        /**
         * @description The disabled state of the select
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description The field to be used for identifying the options
         * @type String
         * @default id
         */
        idField: {
            type: String,
            default: 'id'
        },
        /**
         * @description The keydown events bound to the trigger element
         * @type string[]
         * @default [up, down, enter, space, tab, esc]
         */
        keydownTrigger: {
            type: Array,
            default: () => ['up', 'down', 'enter', 'space', 'tab', 'esc']
        },
        /**
         * @description The keydown events bound to the select option elements
         * @type string[]
         * @default [up, down, enter, space, tab, esc]
         */
        keydownItem: {
            type: Array,
            default: () => ['up', 'down', 'enter', 'space', 'tab', 'esc']
        },
        /**
         * @description Used to extract the label from the select option and select value
         * @type String | Function
         * @default label
         */
        label: {
            type: [String, Function],
            default: 'label'
        },
        /**
         * @description The loading state of the select
         * @type Boolean
         * @default false
         */
        loading: {
            type: Boolean,
            default: false
        },
        /**
         * @description Used to set the field value
         * @type Object
         * @default null
         */
        modelValue: {
            type: Object,
            default: null
        },
        /**
         * @description The minimum input length to open the select dropdown at
         * @type Number
         * @default 0
         */
        minLength: {
            type: Number,
            default: 0
        },
        /**
         * @description The unique identifier of the select
         * @type String
         * @default uid()
         */
        name: {
            type: [String, Number],
            default() {
                return uid('select');
            }
        },
        /**
         * @description The options to be displayed in the select component
         * @type Array
         * @default []
         */
        options: {
            type: Array,
            default: () => []
        },
        /**
         * @description The placeholder of the select input
         * @type String
         * @default ''
         */
        placeholder: {
            type: String,
            default: ''
        },
        /**
         * @description The offset of the dropdown relative to the trigger element
         * @type Number
         * @default 6
         */
        offset: {
            type: Number,
            default: 6
        },
        /**
         * @description The placement of the dropdown
         * @type top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end
         * @default false
         */
        placement: {
            type: String,
            default: 'bottom',
        },
        /**
         * @description Used to override the popper.js options used for creating the dropdown
         * @type Object
         * @default {}
         */
        popperOptions: {
            type: Object,
            default: () => ({
                modifiers: [
                    ...useBaseModifiers({ offset: 8 }),
                    sameWidthModifier()
                ]
            })
        },
        /**
         * @description The readonly state of the select
         * @type Boolean
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * @description The number of pixels until scroll end before loading the next page
         * @type Number
         * @default 160
         */
        scrollTolerance: {
            type: Number,
            default: 160
        },
        /**
         * @description Selects the first option when pressing enter
         * @type Boolean
         * @default true
         */
        selectFirstOptionOnEnter: {
            type: Boolean,
            default: true
        },
        /**
         * @description The size variant of the select
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: '',
            validator: sizePropValidator
        },
        /**
         * @description The tabindex of the select
         * @type Number | String
         * @default 1
         */
        tabindex: {
            type: [Number, String],
            default: 1
        },
        /**
         * @description The type of the select
         * @type String
         * @default text
         */
        type: {
            type: String,
            default: 'text'
        },
        /**
         * @description The total number of options, used for infinite scrolling
         * @type Number
         * @default undefined
         */
        total: {
            type: Number,
            default: undefined
        }
    },
    data() {
        return {
            animating: false,
            visible: false,
            inputValue: this.computeLabel(this.modelValue) || ''
        };
    },
    computed: {
        wrapperClasses() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size)
            };
        },
        popupClasses() {
            return {
                '-disabled': this.isDisabled,
                '-readonly': this.isReadonly,
            };
        },
        tabIndex() {
            return this.isDisabled ? -1 : this.tabindex;
        },
        isClearable() {
            return this.clearable && !this.isDisabled && !this.isReadonly && this.value !== '';
        },
        value() {
            if (this.schema) {
                return this.schema.value;
            }

            return this.modelValue;
        },
        inputPlaceholder() {
            return this.value ? this.computeLabel(this.value) : this.placeholder;
        }
    },
    methods: {
        /**
         * Event bindings
         *
         * Input event handlers for changing the value, clearing the value, clicking,
         * focusing and blurring the input elements.
         */

        onInput(option) {
            if (option.disabled) {
                return;
            }

            this.hide();

            this.parent.onInput?.(this.name, option);
            this.$emit('update:modelValue', option);
        },
        onClear() {
            this.animating = true;
            this.$emit('update:modelValue', null);
            this.$nextTick(() => this.animating = false);
        },
        onFocus(event) {
            // If there is no value and there are no default options,
            // do not open select
            if (!this.value && this.options.length === 0) {
                return;
            }

            if (this.autocomplete) {
                this.inputValue = '';
            }

            const focusShouldShowSelect = !event.relatedTarget ||
                !this.$refs.wrapper.contains(event.relatedTarget);

            if (focusShouldShowSelect && this.inputShouldShowSelect(this.inputValue)) {
                this.show();
            }
        },
        onBlur(event) {
            const blurShouldHideSelect = !event.relatedTarget ||
                !this.$refs.wrapper.contains(event.relatedTarget);

            if (blurShouldHideSelect) {
                this.hide();
                this.inputValue = this.computeLabel(this.value);
            }

            this.parent.onBlur?.(this.name, event);
        },
        onClick() {
            if (this.autocomplete) {
                this.inputValue = '';
            }

            if (this.inputShouldShowSelect(this.inputValue)) {
                this.show();
            }
        },
        onClickOutside() {
            this.hide();
        },
        onCaretClick() {
            this.focus();
        },

        /**
         * Infinite scrolling
         *
         * Compute scroll offset, viewport height and total height and determine if next set of items needs to be loaded
         */

        onScroll() {
            if (isNaN(this.total)) {
                return;
            }

            const scrollTop = this.$refs.body.scrollTop;
            const viewportHeight = parseInt(getComputedStyle(this.$refs.body).height, 10);
            const totalHeight = parseInt(getComputedStyle(this.$refs.options).height, 10);

            const shouldLoadNextPage = scrollTop + viewportHeight > totalHeight - this.scrollTolerance;
            const endReached = this.options.length >= this.total;

            if (shouldLoadNextPage && !endReached && this.options.length > 0 && !this.loading) {
                this.$emit('pagination');
            }
        },
        onWindowResize() {
            this.onScroll();
        },

        /**
         * Accessibility
         *
         * Keyboard bindings for select input and select options
         */

        onTriggerKeyDown(event) {
            if (this.keydownTrigger.length === 0) {
                return;
            }

            const focusableItems = this.getFocusableItems();
            const activeIndex = focusableItems.findIndex((item) => item.active);
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
                        const firstAvailableOption = this.options.find((option) => !option.disabled);

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
        onItemKeyDown(event) {
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
                    event.target.click();

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
        onEscape() {
            this.hide();
        },

        /**
         * Visibility
         *
         * Hide or show the select options menu
         */

        show() {
            if (this.isDisabled || this.isReadonly || this.visible) {
                return;
            }

            this.visible = true;
            this.createPopper();
        },
        hide() {
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

        focus() {
            this.$refs.trigger.focus();
        },
        getFocusableItems() {
            const focusableItems = [];

            for (const child of this.$refs.options.children) {
                if (isFocusable(child)) {
                    focusableItems.push(child);
                }
            }

            return focusableItems;
        },
        getElementHeight(node) {
            const computedStyle = getComputedStyle(node);

            if (!computedStyle.height) {
                return NaN;
            }

            return Math.ceil(parseFloat(computedStyle.height));
        },
        inputMatchesLabel(value) {
            return this.value && value === this.computeLabel(this.value);
        },
        inputMatchesLength(value) {
            return this.minLength === 0 || value && value.length >= this.minLength;
        },
        inputShouldShowSelect(value) {
            if (!this.autocomplete) {
                return true;
            }

            return this.inputMatchesLength(value) && !this.inputMatchesLabel(value);
        },
        computeLabel(option) {
            return isFunction(this.label)
                ? this.label(option)
                : getValueByPath(option, this.label);
        }
    },
    watch: {
        value(value) {
            this.inputValue = this.computeLabel(value);
        },
        inputValue(value) {
            const matchesLength = this.inputMatchesLength(value);
            const matchesLabel = this.inputMatchesLabel(value);

            if (matchesLength && !matchesLabel && !this.animating) {
                this.show();
            }

            this.$emit('search', this.inputValue);
        },
        options() {
            if (this.visible) {
                this.createPopper();
            }
        }
    }
};
