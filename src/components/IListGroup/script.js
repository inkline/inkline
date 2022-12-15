import {
    ClassesProviderMixin,
    SizePropertyMixin,
    VariantPropertyMixin,
} from '@inkline/inkline/src/mixins';

export default {
    name: 'IListGroup',
    mixins: [
        ClassesProviderMixin,

        SizePropertyMixin,
        VariantPropertyMixin
    ],
    props: {
        bordered: {
            type: Boolean,
            default: true
        }
    },
    created() {
        this.classesProvider.add(() => ({
            '-bordered': this.bordered,
        }));
    }
};
