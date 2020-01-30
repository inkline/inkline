import Linkable from '../Linkable';

import AttributesProviderMixin from '@inkline/inkline/src/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

export default {
    name: 'IListGroupItem',
    extends: Linkable,
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin
    ],
    props: {
        tag: {
            type: String,
            default: 'div'
        }
    }
};
