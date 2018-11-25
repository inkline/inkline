import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import EmitProviderMixin from 'inkline/mixins/components/providers/EmitProviderMixin';


import ModelGroupProviderMixin from 'inkline/mixins/forms/providers/ModelGroupProviderMixin';
import IsGroupedPropertyMixin from 'inkline/mixins/forms/properties/IsGroupedPropertyMixin';
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
            return this.parentGroup.value === this.value;
        },
        parentGroup() {
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
        onClick() {
            if (this.isDisabled) {
                return;
            }

            this.dispatch('IDropdown', 'menu-item-click', this);
            this.dispatch('ISelect', 'option-click', { value: this.value, label: this.label });
        }
    },
    created() {
        if (this.classesProvider) {
            this.classesProvider['root'].push(() => ({
                '-active': this.selected,
            }));
        }
    }
};