import Linkable from '@inkline/inkline/src/components/ILinkable';
import {
    AttributesProviderMixin,
    ClassesProviderMixin,
} from '@inkline/inkline/src/mixins';

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
