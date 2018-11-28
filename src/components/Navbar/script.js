import IContainer from '../Container';

import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from 'inkline/mixins/components/properties/VariantPropertyMixin';

export default {
    name: 'INavbar',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        SizePropertyMixin,
        VariantPropertyMixin
    ],
    components: {
        IContainer
    },
    props: {
        fluid: {
            type: Boolean,
            default: false
        }
    }
};