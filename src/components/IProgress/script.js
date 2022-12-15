import {
    ClassesProviderMixin,
    SizePropertyMixin,
    VariantPropertyMixin,
} from '@inkline/inkline/src/mixins';

export default {
    name: 'IProgress',
    mixins: [
        ClassesProviderMixin,

        SizePropertyMixin,
        VariantPropertyMixin,
    ]
};
