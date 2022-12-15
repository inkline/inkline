import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    VariantPropertyMixin,
    SizePropertyMixin
} from '@inkline/inkline/src/mixins';

export default {
    name: 'IBreadcrumb',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        VariantPropertyMixin,
        SizePropertyMixin
    ],
    props: {
        divider: {
            type: String,
            default: '/'
        },
    }
};
