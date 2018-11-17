import DisabledPropertyMixin from 'inkline/mixins/components/properties/DisabledPropertyMixin';

import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import EmitProviderMixin from 'inkline/mixins/components/providers/EmitProviderMixin';

export default {
    name: 'IDropdownItem',
    mixins: [
        DisabledPropertyMixin,

        AttributesProviderMixin,
        ClassesProviderMixin,
        EmitProviderMixin
    ],
    props: {
        tag: {
            type: String,
            default: 'div'
        }
    },
    methods: {
        onClick() {
            this.dispatch('IDropdown', 'menu-item-click', [this.command, this]);
        }
    },
    computed: {
        _tag () {
            return this.attributes.to ? 'router-link' : this.attributes.href ? 'a' : this.tag;
        },
        tabindex() {
            return this.disabled ? null : -1;
        }
    }
};
