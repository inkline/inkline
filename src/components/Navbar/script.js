import IContainer from '../Container';
import IRow from '../Row';
import IColumn from '../Column';

import AttributesProviderMixin from '@inkline/inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from '@inkline/inkline/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from '@inkline/inkline/mixins/components/properties/VariantPropertyMixin';

export default {
    name: 'INavbar',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        SizePropertyMixin,
        VariantPropertyMixin
    ],
    components: {
        IContainer,
        IRow,
        IColumn
    },
    props: {
        fluid: {
            type: Boolean,
            default: false
        }
    }
};