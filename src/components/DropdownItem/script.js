import Linkable from '../Linkable';

import DisabledPropertyMixin from '@inkline/inkline/src/mixins/components/properties/DisabledPropertyMixin';
import TabIndexPropertyMixin from '@inkline/inkline/src/mixins/components/properties/TabIndexPropertyMixin';

import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';
import EmitProviderMixin from '@inkline/inkline/src/mixins/components/providers/EmitProviderMixin';

export default {
    name: 'IDropdownItem',
    extends: Linkable,
    mixins: [
        DisabledPropertyMixin,
        TabIndexPropertyMixin,

        ClassesProviderMixin,
        EmitProviderMixin
    ],
    props: {
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
            this.dispatch('IDropdown', 'item-click', [this.action, this]);
        }
    }
};
