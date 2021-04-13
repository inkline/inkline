import { isKey, uid } from '@inkline/inkline/src/helpers';
import {
    colorVariantClass,
    sizePropValidator
} from '@inkline/inkline/src/mixins';
import { FormComponentMixin } from '@inkline/inkline/src/mixins';
import { ClickOutside } from '@inkline/inkline/src/directives';
import IInput from '@inkline/inkline/src/components/IInput/index.vue';
import IIcon from '@inkline/inkline/src/components/IIcon/index.vue';
import IDropdown from '@inkline/inkline/src/components/IDropdown/index.vue';
import IDropdownItem from '@inkline/inkline/src/components/IDropdown/components/IDropdownItem/index.vue';
import { getValueByPath } from "@inkline/inkline/src/helpers";
import { useBaseModifiers, sameWidthModifier } from "@inkline/inkline/src/mixins/PopupMixin";

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
        FormComponentMixin
    ],
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
        'search'
    ],
    components: {
        IInput,
        IIcon,
        IDropdown,
        IDropdownItem
    },
    directives: {
        ClickOutside
    },
    props: {
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
         * @description The id of the internal select element
         * @type String
         * @default
         */
        id: {
            type: String,
            default: ''
        },
        /**
         * @description Used to extract the label from the select option and select value
         * @type String
         * @default ''
         */
        label: {
            type: String,
            default: ''
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
         * @description The readonly state of the select
         * @type Boolean
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
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
    },
    data() {
        return {
            open: false,
            inputValue: getValueByPath(this.modelValue, this.label) || '',
            popperOptions: {
                modifiers: [
                    ...useBaseModifiers({ offset: 8 }),
                    sameWidthModifier()
                ]
            }
        };
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-disabled': this.isDisabled,
                '-readonly': this.isReadonly,
                '-prefixed': Boolean(this.$slots.prefix),
                '-suffixed': Boolean(this.$slots.suffix),
                '-prepended': Boolean(this.$slots.prepend),
                '-appended': Boolean(this.$slots.append),
            };
        },
        tabIndex() {
            return this.isDisabled ? -1 : this.tabindex;
        },
        isClearable() {
            return this.clearable && !this.isDisabled && !this.isReadonly && this.modelValue !== '';
        },
        value() {
            if (this.schema) {
                return this.schema.value;
            }

            return this.modelValue;
        },
        inputPlaceholder() {
            return this.value ? getValueByPath(this.value, this.label) : this.placeholder;
        }
    },
    methods: {
        onInput(option) {
            if (option.disabled) {
                return;
            }

            this.parent.onInput?.(this.name, option);

            this.$emit('update:modelValue', option);
        },
        onBlur(event) {
            this.closeSelect();

            this.parent.onBlur?.(this.name, event);
        },
        onClear() {
            this.$emit('update:modelValue', '');
        },
        onClickOutside() {
            this.closeSelect();
        },
        onInputClick() {
            this.openSelect();

            if (this.autocomplete) {
                this.inputValue = '';
            }
        },
        onInputFocus() {
            this.openSelect();

            if (this.autocomplete) {
                this.inputValue = '';
            }
        },
        onInputBlur() {
            this.inputValue = getValueByPath(this.value, this.label);
        },
        onInputChange() {
            this.$emit('search', this.inputValue);
        },
        onInputKeydown(event) {
            if (isKey('space', event)) {
                event.stopPropagation();
            }
        },
        focusInput() {
            this.$refs.input.focus();
        },
        openSelect() {
            this.open = true;
        },
        closeSelect() {
            this.open = false;
        },
        getOptionLabel(option) {
            return getValueByPath(option, this.label);
        }
    },
    watch: {
        value(value) {
            this.inputValue = getValueByPath(value, this.label);
        }
    }
};
