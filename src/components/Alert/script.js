import AttributesProviderMixin from '../../mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '../../mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from '../../mixins/components/properties/SizePropertyMixin';
import ThemePropertyMixin from '../../mixins/components/properties/ThemePropertyMixin';

export default {
    name: 'Alert',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        SizePropertyMixin,
        ThemePropertyMixin
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
        },
        faded: {
            type: Boolean,
            default: false
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
        if (this.classesProvider) {
            this.classesProvider['root'].push(() => ({
                '-dismissible': this.dismissible,
                '-faded': this.faded,
                '-with-icon': this.$slots.icon
            }));
        }
    }
};