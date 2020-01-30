import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from '@inkline/inkline/src/mixins/components/properties/SizePropertyMixin';

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