import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import EmitProviderMixin from 'inkline/mixins/components/providers/EmitProviderMixin';

import DisabledPropertyMixin from 'inkline/mixins/components/properties/DisabledPropertyMixin';
import EmitClickMethodMixin from 'inkline/mixins/components/methods/EmitClickMethodMixin';

export default {
    name: 'ISelectOption',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        EmitProviderMixin,

        EmitClickMethodMixin,

        DisabledPropertyMixin,
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
    computed: {
        selected () {
            return this.parentSelect.value === this.value;
        },
        parentSelect() {
            let parent = this.$parent;

            while (parent) {
                if (parent.$options.name === 'ISelect' || (parent.$options.extends || {}).name === 'ISelect') {
                    return parent;
                }

                parent = parent.$parent;
            }

            return undefined;
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
            '-active': this.selected,
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