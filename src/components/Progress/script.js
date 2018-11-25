import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';

export default {
    name: 'INavbarBrand',
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
        if (this.classesProvider) {
            this.classesProvider['root'].push(() => ({
                '-tabs': this.tabs,
                '-vertical': this.vertical
            }));
        }
    }
};