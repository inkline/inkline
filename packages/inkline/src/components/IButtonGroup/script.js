import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    InjectParentFormProviderMixin,
    DisabledFormPropertyMixin,
    SizePropertyMixin,
    TabIndexPropertyMixin,
} from '@inkline/inkline/src/mixins';

export default {
    name: 'IButtonGroup',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        InjectParentFormProviderMixin,

        DisabledFormPropertyMixin,
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
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    created() {
        this.classesProvider.add(() => ({ 
            '-vertical': this.vertical,
            '-block': this.block,
        }));
    }
};
