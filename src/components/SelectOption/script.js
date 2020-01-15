import AttributesProviderMixin from '@inkline/inkline/src/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';
import EmitProviderMixin from '@inkline/inkline/src/mixins/components/providers/EmitProviderMixin';

import EmitClickMethodMixin from '@inkline/inkline/src/mixins/components/methods/EmitClickMethodMixin';

import DisabledPropertyMixin from '@inkline/inkline/src/mixins/components/properties/DisabledPropertyMixin';
import ParentFormGroupPropertyMixin from '@inkline/inkline/src/mixins/forms/properties/ParentFormGroupPropertyMixin';

export default {
    name: 'ISelectOption',
    extends: { name: 'IDropdownItem' },
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        EmitProviderMixin,

        EmitClickMethodMixin,

        DisabledPropertyMixin,
        ParentFormGroupPropertyMixin
    ],
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        label: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            parentFormGroupName: 'ISelect'
        }
    },
    computed: {
        active() {
            return (this.parentFormGroup || {}).value === this.value;
        }
    },
    methods: {
        getDispatchProps() {
            return {
                value: this.value,
                label: this.label,
                disabled: this.disabled
            };
        },
        onClick(e) {
            if (this.isDisabled) {
                return;
            }

            this.dispatch('ISelect', 'option-click', this.getDispatchProps());
            this.dispatch('IDropdown', 'item-click', this);
            this.emitClick(e);
        },
    },
    created() {
        this.classesProvider.add('root', () => ({
            '-active': this.active,
        }));
    }
};
