import Linkable from '../Linkable';

import SizePropertyMixin from '@inkline/inkline/src/mixins/components/properties/SizePropertyMixin';

export default {
    name: 'IBreadcrumbItem',
    extends: Linkable,
    mixins: [
        SizePropertyMixin
    ]
};
