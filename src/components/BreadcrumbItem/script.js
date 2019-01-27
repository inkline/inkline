import AttributesProviderMixin from '@inkline/inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';

import ActivePropertyMixin from '@inkline/inkline/mixins/components/properties/ActivePropertyMixin';
import SizePropertyMixin from '@inkline/inkline/mixins/components/properties/SizePropertyMixin';

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