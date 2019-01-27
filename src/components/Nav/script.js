import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from '@inkline/inkline/mixins/components/properties/SizePropertyMixin';

export default {
    name: 'INav',
    mixins: [
        ClassesProviderMixin,

        SizePropertyMixin,
    ],
    props: {
        tabs: {
            type: Boolean,
            default: false
        },
        vertical: {
            type: Boolean,
            default: false
        }
    },
    created () {
        this.classesProvider.add(() => ({
            '-tabs': this.tabs,
            '-vertical': this.vertical
        }));
    }
};