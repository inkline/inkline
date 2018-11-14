import DisabledPropertyMixin from 'inkline/mixins/components/properties/DisabledPropertyMixin';

import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import EmitProviderMixin from 'inkline/mixins/components/providers/EmitProviderMixin';

export default {
    name: 'IDropdownItem',
    mixins: [
        DisabledPropertyMixin,

        ClassesProviderMixin,
        EmitProviderMixin
    ],
    props: {
        divider: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        onClick() {
            this.dispatch('IDropdown', 'menu-item-click', [this.command, this]);
        }
    },
    computed: {
        tabindex() {
            return this.disabled ? null : -1;
        }
    },
    created () {
        if (this.classesProvider) {
            this.classesProvider['root'].push(() => ({
                '-divider': this.divider
            }));
        }
    }
};
