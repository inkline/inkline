import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from 'inkline/mixins/components/properties/VariantPropertyMixin';

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
    data () {
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
    watch: {
        show () {
            this.onShowChange()
        }
    },
    mounted () {
        this.onShowChange()
    },
    methods: {
        dismiss () {
            this.dismissed = true;

            this.$emit('dismiss');
            this.$emit('input', false);
        },
        onShowChange () {
            this.dismissed = false;
        }
    },
    created () {
        this.classesProvider.add(() => ({
            '-dismissible': this.dismissible,
            '-faded': this.faded,
            '-with-icon': this.$slots.icon
        }));
    }
};