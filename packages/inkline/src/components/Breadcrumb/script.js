import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    SizePropertyMixin
} from '@inkline/inkline/src/mixins';

export default {
    name: 'IBreadcrumb',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        SizePropertyMixin
    ],
    props: {
        divider: {
            type: String,
            default: '/'
        },
    }
};
