import AttributesProviderMixin from '@inkline/inkline/src/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from '@inkline/inkline/src/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from '@inkline/inkline/src/mixins/components/properties/VariantPropertyMixin';

export default {
    name: 'IAlert',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        SizePropertyMixin,
        VariantPropertyMixin
    ],
    model: {
        prop: 'show',
        event: 'input'
    },
    data() {
        return {
            dismissed: false
        }
    },
    props: {
        show: {
            type: Boolean,
            default: true
        },
        dismissible: {
            type: Boolean,
            default: false
        },
        dismissLabel: {
            type: String,
            default: '×'
        }
    },
    methods: {
        dismiss() {
            this.dismissed = true;

            this.$emit('dismiss');
            this.$emit('input', false);
        },
        onShowChange() {
            this.dismissed = false;
        }
    },
    watch: {
        show() {
            this.onShowChange()
        }
    },
    mounted() {
        this.onShowChange()
    },
    created() {
        this.classesProvider.add(() => ({
            '-dismissible': this.dismissible,
            '-with-icon': Boolean(this.$slots.icon)
        }));
    }
};
