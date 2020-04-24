import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    SizePropertyMixin,
    VariantPropertyMixin,
} from '@inkline/inkline/src/mixins';

export default {
    name: 'ICard',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        SizePropertyMixin,
        VariantPropertyMixin
    ]
};
