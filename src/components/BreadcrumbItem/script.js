import Linkable from '../Linkable';

import SizePropertyMixin from '@inkline/inkline/mixins/components/properties/SizePropertyMixin';

export default {
    name: 'IBreadcrumbItem',
    extends: Linkable,
    mixins: [
        SizePropertyMixin
    ]
};