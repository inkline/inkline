import Linkable from '../Linkable';

import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';

import DisabledPropertyMixin from '@inkline/inkline/mixins/components/properties/DisabledPropertyMixin';

export default {
    name: 'INavItem',
    extends: Linkable,
    mixins: [
        ClassesProviderMixin,

        DisabledPropertyMixin,
    ]
};