import Linkable from '@inkline/inkline/src/components/ILinkable';
import {
    ClassesProviderMixin,
    EmitProviderMixin,
    DisabledPropertyMixin,
} from '@inkline/inkline/src/mixins';

export default {
    name: 'INavItem',
    extends: Linkable,
    mixins: [
        ClassesProviderMixin,
        EmitProviderMixin,

        DisabledPropertyMixin,
    ],
    props: {
        tag: {
            type: String,
            default: 'div'
        }
    },
    methods: {
        onClick(event) {
            this.$emit('click', event);
            this.dispatch('INav', 'item-click', this);
        }
    }
};
