import Linkable from '../Linkable';

import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

import DisabledPropertyMixin from '@inkline/inkline/src/mixins/components/properties/DisabledPropertyMixin';

export default {
    name: 'INavItem',
    extends: Linkable,
    mixins: [
        ClassesProviderMixin,

        DisabledPropertyMixin,
    ],
    props: {
        tag: {
            type: String,
            default: 'div'
        }
    }
};