import Linkable from '../Linkable';

import AttributesProviderMixin from '@inkline/inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';

import DisabledPropertyMixin from '@inkline/inkline/mixins/components/properties/DisabledPropertyMixin';

export default {
    name: 'IListGroupItem',
    extends: Linkable,
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        DisabledPropertyMixin
    ],
    props: {
        tag: {
            type: String,
            default: 'div'
        }
    }
};