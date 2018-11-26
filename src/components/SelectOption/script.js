import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import EmitProviderMixin from 'inkline/mixins/components/providers/EmitProviderMixin';

import DisabledPropertyMixin from 'inkline/mixins/components/properties/DisabledPropertyMixin';

export default {
    name: 'ISelectOption',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        EmitProviderMixin,

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
            return this.parentFormGroup.value === this.value;
        },
        parentFormGroup() {
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
        onClick() {
            if (this.isDisabled) {
                return;
            }

            this.dispatch('IDropdown', 'menu-item-click', this);
            this.dispatch('ISelect', 'option-click', this.getDispatchProps());
        }
    },
    created() {
        if (this.classesProvider) {
            this.classesProvider['root'].push(() => ({
                '-active': this.selected,
            }));
        }
    },
    mounted() {
        this.dispatch('ISelect', 'option-mounted', this.getDispatchProps());
    },
    destroyed() {
        this.dispatch('ISelect', 'option-destroyed', this.getDispatchProps());
    }
};