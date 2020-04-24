import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    SizePropertyMixin,
    VariantPropertyMixin
} from '@inkline/inkline/src/mixins';

export default {
    name: 'IBadge',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        SizePropertyMixin,
        VariantPropertyMixin
    ]
};
