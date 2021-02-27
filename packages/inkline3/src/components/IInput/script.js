import {
    // AttributesProviderMixin,
    // ClassesProviderMixin,
    // InjectParentFormProviderMixin,
    // ModelProviderMixin,
    // ClickInputRefMethodMixin,
    // FocusInputRefMethodMixin,
    // EmitChangeMethodMixin,
    // EmitClickMethodMixin,
    // EmitFocusMethodMixin,
    // EmitHoverMethodMixin,
    // EmitInputMethodMixin,
    // EmitKeydownMethodMixin,
    // ClearablePropertyMixin,
    // DisabledFormPropertyMixin,
    // NamePropertyMixin,
    // ParentFormGroupPropertyMixin,
    // ReadonlyPropertyMixin,
    // SizePropertyMixin,
    // TabIndexPropertyMixin,
    // VariantPropertyMixin,
    // SchemaProviderMixin,
    sizePropValidator
} from '@inkline/inkline/src/mixins';

export default {
    name: 'IInput',
    inheritAttrs: false,
    mixins: [
        // AttributesProviderMixin,
        // ClassesProviderMixin,
        // InjectParentFormProviderMixin,
        // ModelProviderMixin,
        // SchemaProviderMixin,
        //
        // ClickInputRefMethodMixin,
        // FocusInputRefMethodMixin,
        // EmitChangeMethodMixin,
        // EmitClickMethodMixin,
        // EmitFocusMethodMixin,
        // EmitHoverMethodMixin,
        // EmitInputMethodMixin,
        // EmitKeydownMethodMixin,
        //
        // ClearablePropertyMixin,
    ],
    props: {
        /**
         * @description The color variant of the input
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * @description Display the input as clearable
         * @type Boolean
         * @default false
         */
        clearable: {
            type: Boolean,
            default: false
        },
        /**
         * @description The disabled state of the input
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description The unique identifier of the input
         * @type String
         * @default uid()
         */
        name: {
            type: String,
            default() {
                return uid('input');
            }
        },
        /**
         * @description The readonly state of the input
         * @type Boolean
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * @description The size variant of the input
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: '',
            validator: sizePropValidator
        },
        /**
         * @description The tabindex of the input
         * @type Number | String
         * @default 1
         */
        tabindex: {
            type: [Number, String],
            default: 1
        },
    },
    inject: {
        formGroup: {
            default: () => {}
        },
        form: {
            default: () => {}
        }
    },
    computed: {
        classes() {
            return {
                '-disabled': Boolean(this.isDisabled),
                '-readonly': Boolean(this.isReadonly),
                '-prefixed': Boolean(this.$slots.prefix),
                '-suffixed': Boolean(this.$slots.suffix)
            };
        },
        wrapperClasses() {
            return {
                '-prepended': Boolean(this.$slots.prepend) || this.prepended,
                '-appended': Boolean(this.$slots.append) || this.appended,
                '-error': this.schema.$invalid
            };
        },
        isDisabled() {
            return this.disabled || this.form.isDisabled || this.formGroup.isDisabled;
        },
        isReadonly() {
            return this.readonly || this.form.isReadonly || this.formGroup.isReadonly;
        },
        tabIndex() {
            return this.isDisabled ? -1 : this.tabindex;
        },
        isClearable() {
            return this.clearable && this.currentValue !== '';
        }
    },
    methods: {
        onInput(value) {
            this.$emit('input', value);
        }
    }
};
