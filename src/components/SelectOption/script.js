import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import EmitProviderMixin from 'inkline/mixins/components/providers/EmitProviderMixin';

import EmitClickMethodMixin from 'inkline/mixins/components/methods/EmitClickMethodMixin';

import DisabledPropertyMixin from 'inkline/mixins/components/properties/DisabledPropertyMixin';
import ParentFormGroupPropertyMixin from 'inkline/mixins/forms/properties/ParentFormGroupPropertyMixin';

export default {
    name: 'ISelectOption',
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
            type: String,
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
        active () {
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

            this.dispatch('IDropdown', 'menu-item-click', this);
            this.dispatch('ISelect', 'option-click', this.getDispatchProps());
            this.emitClick(e);
        },
    },
    created() {
        this.classesProvider.add('root', () => ({
            '-active': this.active,
        }));
    },
    mounted() {
        this.dispatch('ISelect', 'option-mounted', this.getDispatchProps());
        this.dispatch('IDropdown', 'dropdown-item-mounted', this);
    },
    destroyed() {
        this.dispatch('ISelect', 'option-destroyed', this.getDispatchProps());
        this.dispatch('IDropdown', 'dropdown-item-destroyed', this);
    }
};