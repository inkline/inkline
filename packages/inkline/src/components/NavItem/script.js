import Linkable from '../Linkable';

import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';
import EmitProviderMixin from '@inkline/inkline/src/mixins/components/providers/EmitProviderMixin';

import DisabledPropertyMixin from '@inkline/inkline/src/mixins/components/properties/DisabledPropertyMixin';

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
