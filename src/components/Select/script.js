import IInput from 'inkline/components/Input';
import IDropdown from 'inkline/components/Dropdown';
import IDropdownMenu from 'inkline/components/DropdownMenu';

import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from 'inkline/mixins/forms/providers/InjectParentFormProviderMixin';
import ModelProviderMixin from 'inkline/mixins/forms/providers/ModelProviderMixin';

import DisabledPropertyMixin from 'inkline/mixins/forms/properties/DisabledPropertyMixin';
import ReadonlyPropertyMixin from 'inkline/mixins/forms/properties/ReadonlyPropertyMixin';
// import IsGroupedPropertyMixin from 'inkline/mixins/forms/properties/IsGroupedPropertyMixin';
// import LabelPositionPropertyMixin from 'inkline/mixins/forms/properties/LabelPositionPropertyMixin';
import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';
// import TabIndexPropertyMixin from 'inkline/mixins/components/properties/TabIndexPropertyMixin';

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
            labelModel: ''
        }
    },
    mixins: [
        ClassesProviderMixin,
        InjectParentFormProviderMixin,
        ModelProviderMixin,

        // ClickMethodMixin,
        // FocusMethodMixin,
        // OnChangeMethodMixin,
        // OnClickMethodMixin,
        // OnFocusMethodMixin,
        // OnHoverMethodMixin,
        // OnInputMethodMixin,

        // ClearablePropertyMixin,
        DisabledPropertyMixin,
        // IsGroupedPropertyMixin,
        // LabelPositionPropertyMixin,
        ReadonlyPropertyMixin,
        SizePropertyMixin,
        // TabIndexPropertyMixin
    ],
    created() {
        this.$on('option-click', (data) => {
            this.model = data.value;
            this.labelModel = data.label;
        });
    }
};
