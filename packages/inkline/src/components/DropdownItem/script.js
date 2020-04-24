import Linkable from '@inkline/inkline/src/components/ILinkable';
import {
    ClassesProviderMixin,
    EmitProviderMixin,
    DisabledPropertyMixin
} from '@inkline/inkline/src/mixins';

export default {
    name: 'IDropdownItem',
    extends: Linkable,
    mixins: [
        DisabledPropertyMixin,

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
            this.$emit('click');
        }
    }
};
