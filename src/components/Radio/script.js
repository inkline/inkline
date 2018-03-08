export default {
    name: 'Radio',
    inject: {
        elForm: {
            default: ''
        },
        elFormItem: {
            default: ''
        }
    },
    componentName: 'Radio',
    props: {
        value: {},
        label: {},
        disabled: Boolean,
        name: String,
        border: Boolean,
        size: String
    },
    data() {
        return {
            focus: false
        };
    },
    computed: {
        isGroup() {
            let parent = this.$parent;
            while (parent) {
                if (parent.$options.componentName !== 'ElRadioGroup') {
                    parent = parent.$parent;
                } else {
                    this._radioGroup = parent;
                    return true;
                }
            }
            return false;
        },
        model: {
            get() {
                return this.isGroup ? this._radioGroup.value : this.value;
            },
            set(val) {
                if (this.isGroup) {
                    this.dispatch('ElRadioGroup', 'input', [val]);
                } else {
                    this.$emit('input', val);
                }
            }
        },
        _elFormItemSize() {
            return (this.elFormItem || {}).elFormItemSize;
        },
        radioSize() {
            const temRadioSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
            return this.isGroup
                ? this._radioGroup.radioGroupSize || temRadioSize
                : temRadioSize;
        },
        isDisabled() {
            return this.isGroup
                ? this._radioGroup.disabled || this.disabled || (this.elForm || {}).disabled
                : this.disabled || (this.elForm || {}).disabled;
        },
        tabIndex() {
            return !this.isDisabled ? (this.isGroup ? (this.model === this.label ? 0 : -1) : 0) : -1;
        }
    },
    methods: {
        handleChange() {
            this.$nextTick(() => {
                this.$emit('change', this.model);
                this.isGroup && this.dispatch('ElRadioGroup', 'handleChange', this.model);
            });
        }
    }
};
