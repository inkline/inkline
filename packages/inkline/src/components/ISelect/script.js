import IInput from '@inkline/inkline/src/components/IInput';
import IDropdown from '@inkline/inkline/src/components/IDropdown';
import IDropdownMenu from '@inkline/inkline/src/components/IDropdownMenu';
import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    InjectParentFormProviderMixin,
    ModelProviderMixin,
    EmitChangeMethodMixin,
    EmitClickMethodMixin,
    EmitFocusMethodMixin,
    EmitInputMethodMixin,
    EmitKeydownMethodMixin,
    DisabledFormPropertyMixin,
    NamePropertyMixin,
    ReadonlyPropertyMixin,
    ParentFormGroupPropertyMixin,
    SizePropertyMixin,
    TabIndexPropertyMixin,
    VariantPropertyMixin,
} from '@inkline/inkline/src/mixins';
import { SchemaProviderMixin } from '@inkline/inkline/src/mixins';
import { hashString, querySelectorAll, uid, isMobile } from "@inkline/inkline/src/helpers";
import { FormBuilder } from "@inkline/inkline/src/factories/FormBuilder";

export default {
    name: 'ISelect',
    components: {
        IInput,
        IDropdown,
        IDropdownMenu
    },
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        InjectParentFormProviderMixin,
        ModelProviderMixin,
        SchemaProviderMixin,

        // ClickMethodMixin,
        // FocusMethodMixin,
        EmitChangeMethodMixin,
        EmitClickMethodMixin,
        EmitFocusMethodMixin,
        EmitInputMethodMixin,
        EmitKeydownMethodMixin,
        // EmitHoverMethodMixin,

        DisabledFormPropertyMixin,
        NamePropertyMixin,
        ParentFormGroupPropertyMixin,
        ReadonlyPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin,
        VariantPropertyMixin
    ],
    props: {
        filterable: {
            type: Boolean,
            default: false
        },
        native: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        }
    },
    data() {
        const basename = 'select';

        return {
            id: this.$attrs.id || uid(basename),
            isMobile: isMobile(),
            labelModel: '',
            options: []
        }
    },
    watch: {
        model(value) {
            this.setLabelModel(value);
        }
    },
    methods: {
        setLabelModel(value) {
            const option = this.options.find((o) => o.value === value);

            this.labelModel = option ? option.label || option.value : value;
        },
        focusInputRef() {
            this.isMobile ? this.$refs.select.focus() : this.$refs.input.focusInputRef();
        },
        clickInputRef() {
            if (this.isMobile) {
                this.$refs.select.click();
            } else {
                this.$refs.input.clickInputRef();
                this.$refs.dropdown.visible ? this.$refs.dropdown.hide() : this.$refs.dropdown.show();
            }
        },
        changeInputRef(e) {
            this.$emit('input', e.target.value);
        },
        initElements() {
            let options = querySelectorAll(this.$refs.dropdownMenu.$children, 'ISelectOption')
                .map(({ label, value }) => ({
                    id: hashString(label + value),
                    label,
                    value
                }));

            const sameLength = this.options.length === options.length;
            const sameElements = this.options
                .every((_, index) => this.options[index].id === (options[index] || {}).id);

            if (!sameLength || !sameElements) {
                this.options = options;
            }
        }
    },
    created() {
        this.classesProvider.add('root', () => ({
            '-prefixed': Boolean(this.$slots.prefix),
            '-suffixed': Boolean(this.$slots.suffix)
        }));

        this.$on('option-click', (option) => {
            this.$emit('input', option.value);
        });
    },
    mounted() {
        this.initElements();
        this.$on('init', this.initElements);

        if (this.schema) {
            this.setLabelModel(this.schema[FormBuilder.keys.VALUE]);
        } else if (this.value) {
            this.setLabelModel(this.value);
        }
    },
    updated() {
        this.initElements();
    }
};
