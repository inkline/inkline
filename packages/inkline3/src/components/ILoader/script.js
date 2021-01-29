import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    SizePropertyMixin,
    VariantPropertyMixin,
} from '@inkline/inkline/src/mixins';

export default {
    name: 'ILoader',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        SizePropertyMixin,
        VariantPropertyMixin
    ],
    props: {
        count: {
            type: Number,
            default: 12
        },
        size: {
            type: String,
            default: ''
        }
    }
};
