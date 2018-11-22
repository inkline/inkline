import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from 'inkline/mixins/components/properties/VariantPropertyMixin';

export default {
    name: 'INavbarBrand',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        SizePropertyMixin,
        VariantPropertyMixin
    ],
    props: {
        fluid: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        _tag () {
            return this.attributes.to ? 'router-link' : 'a';
        }
    },
    created () {
        if (this.classesProvider) {
            this.classesProvider['root'].push(() => ({}));
        }
    }
};