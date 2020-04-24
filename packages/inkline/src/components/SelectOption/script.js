import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    EmitProviderMixin,
    EmitClickMethodMixin,
    DisabledPropertyMixin,
    ParentFormGroupPropertyMixin,
} from '@inkline/inkline/src/mixins';

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
