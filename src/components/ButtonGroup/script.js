import AttributesProviderMixin from '@inkline/inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from '@inkline/inkline/mixins/forms/providers/InjectParentFormProviderMixin';

import DisabledPropertyMixin from '@inkline/inkline/mixins/forms/properties/DisabledPropertyMixin';
import TabIndexPropertyMixin from '@inkline/inkline/mixins/components/properties/TabIndexPropertyMixin';
import SizePropertyMixin from '@inkline/inkline/mixins/components/properties/SizePropertyMixin';

export default {
    name: 'IButtonGroup',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        InjectParentFormProviderMixin,

        DisabledPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin
    ],
    props: {
        /**
         * Modifiers
         */
        vertical: {
            type: Boolean,
            default: false
        }
    },
    created () {
        this.classesProvider.add(() => ({ '-vertical': this.vertical }));
    }
};
