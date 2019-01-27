import DisabledPropertyMixin from 'inkline/mixins/components/properties/DisabledPropertyMixin';
import TabIndexPropertyMixin from 'inkline/mixins/components/properties/TabIndexPropertyMixin';

import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import EmitProviderMixin from 'inkline/mixins/components/providers/EmitProviderMixin';

export default {
    name: 'IDropdownItem',
    mixins: [
        DisabledPropertyMixin,
        TabIndexPropertyMixin,

        AttributesProviderMixin,
        ClassesProviderMixin,
        EmitProviderMixin
    ],
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        action: {
            type: [String, Number, Boolean],
            default: undefined
        },
        tabindex: {
            type: [Number, String],
            default: -1
        }
    },
    methods: {
        onClick() {
            this.dispatch('IDropdown', 'menu-item-click', [this.action, this]);
        }
    },
    computed: {
        isTag () {
            return this.attributes.to ? 'router-link' : this.attributes.href ? 'a' : this.tag;
        },
    },
    mounted() {
        this.dispatch('IDropdown', 'dropdown-item-mounted', this);
    },
    destroyed() {
        this.dispatch('IDropdown', 'dropdown-item-destroyed', this);
    }
};
