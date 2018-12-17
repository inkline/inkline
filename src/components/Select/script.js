import IInput from 'inkline/components/Input';
import IDropdown from 'inkline/components/Dropdown';
import IDropdownMenu from 'inkline/components/DropdownMenu';

import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from 'inkline/mixins/forms/providers/InjectParentFormProviderMixin';
import ModelProviderMixin from 'inkline/mixins/forms/providers/ModelProviderMixin';
import SchemaProviderMixin from 'inkline/mixins/forms/providers/SchemaProviderMixin';

import EmitChangeMethodMixin from 'inkline/mixins/components/methods/EmitChangeMethodMixin';
import EmitClickMethodMixin from 'inkline/mixins/components/methods/EmitClickMethodMixin';
import EmitFocusMethodMixin from 'inkline/mixins/components/methods/EmitFocusMethodMixin';
import EmitInputMethodMixin from 'inkline/mixins/components/methods/EmitInputMethodMixin';
import EmitKeydownMethodMixin from 'inkline/mixins/components/methods/EmitKeydownMethodMixin';

import DisabledPropertyMixin from 'inkline/mixins/forms/properties/DisabledPropertyMixin';
import NamePropertyMixin from 'inkline/mixins/forms/properties/NamePropertyMixin';
import ReadonlyPropertyMixin from 'inkline/mixins/forms/properties/ReadonlyPropertyMixin';
import ParentFormGroupPropertyMixin from 'inkline/mixins/forms/properties/ParentFormGroupPropertyMixin';
import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from 'inkline/mixins/components/properties/TabIndexPropertyMixin';
import {uid} from "@/helpers";

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

        DisabledPropertyMixin,
        NamePropertyMixin,
        ParentFormGroupPropertyMixin,
        ReadonlyPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin
    ],
    props: {
        filterable: {
            type: Boolean,
            default: false
        },
        native: {
            type: Boolean,
            default: false
        }
    },
    data() {
        const basename = 'select';

        return {
            labelModel: '',
            id: this.$attrs.id || uid(basename),
            options: []
        }
    },
    methods: {
        focusInputRef() {
            this.$isMobile ? this.$refs.select.focus() : this.$refs.input.focusInputRef();
        },
        clickInputRef() {
            if (this.$isMobile) {
                this.$refs.select.click();
            } else {
                this.$refs.input.clickInputRef();
                this.$refs.dropdown.visible ? this.$refs.dropdown.hide() : this.$refs.dropdown.show();
            }
        }
    },
    created() {
        this.classesProvider.add('root', () => ({
            '-prefixed': this.$slots.prefix,
            '-suffixed': this.$slots.suffix
        }));

        this.$on('option-click', (option) => {
            this.model = option.value;
        });

        this.$on('option-mounted', (option) => {
            this.options.push(option);

            if (option.value === this.model) {
                this.labelModel = option.label || option.value;
            }
        });

        this.$on('option-destroyed', (option) => {
            this.options = this.options.filter((o) => o.value !== option.value);
        });
    },
    watch: {
        model(value) {
            const option = this.options.find((o) => o.value === value);

            this.labelModel = option.label || option.value;
        }
    }
};
