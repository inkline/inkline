import AttributesProviderMixin from '@inkline/inkline/src/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

import ActivePropertyMixin from '@inkline/inkline/src/mixins/components/properties/ActivePropertyMixin';
import SizePropertyMixin from '@inkline/inkline/src/mixins/components/properties/SizePropertyMixin';

export default {
    name: 'IBreadcrumbItem',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        ActivePropertyMixin,
        SizePropertyMixin
    ],
    computed: {
        tag() {
            return this.attributes.to ? 'router-link' : 'a';
        }
    }
};