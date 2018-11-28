import IInput from 'inkline/components/Input';
import IDropdown from 'inkline/components/Dropdown';
import IDropdownMenu from 'inkline/components/DropdownMenu';

import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from 'inkline/mixins/forms/providers/InjectParentFormProviderMixin';
import ModelProviderMixin from 'inkline/mixins/forms/providers/ModelProviderMixin';

import DisabledPropertyMixin from 'inkline/mixins/forms/properties/DisabledPropertyMixin';
import ReadonlyPropertyMixin from 'inkline/mixins/forms/properties/ReadonlyPropertyMixin';
import ParentFormGroupPropertyMixin from 'inkline/mixins/forms/properties/ParentFormGroupPropertyMixin';
import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';

export default {
    name: 'ISelect',
    components: {
        IInput,
        IDropdown,
        IDropdownMenu
    },
    props: {
        filterable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            labelModel: '',
            options: []
        }
    },
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        InjectParentFormProviderMixin,
        ModelProviderMixin,

        // ClickMethodMixin,
        // FocusMethodMixin,
        // EmitChangeMethodMixin,
        // EmitClickMethodMixin,
        // EmitFocusMethodMixin,
        // EmitHoverMethodMixin,
        // EmitInputMethodMixin,

        DisabledPropertyMixin,
        ParentFormGroupPropertyMixin,
        ReadonlyPropertyMixin,
        SizePropertyMixin,
    ],
    created() {
        this.$on('option-click', (data) => {
            this.model = data.value;
        });

        this.$on('option-mounted', (data) => {
            this.options.push(data);
        });

        this.$on('option-destroyed', (data) => {
            this.options = this.options.filter((o) => o.value !== data.value);
        });
    },
    watch: {
        model(value) {
            const option = this.options.find((o) => o.value === value);

            this.labelModel = option.label || option.value;
        }
    }
};
