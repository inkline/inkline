import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from '@inkline/inkline/mixins/components/properties/SizePropertyMixin';

export default {
    name: 'IListGroup',
    mixins: [
        ClassesProviderMixin,

        SizePropertyMixin,
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