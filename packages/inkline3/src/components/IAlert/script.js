import { sizeValidator } from "@/validators";

export default {
    name: 'IAlert',
    props: {
        size: {
            type: String,
            default: '',
            validator: sizeValidator
        },
        variant: {
            type: String,
            default: ''
        },
        value: {
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
    data() {
        return {
            dismissed: false
        }
    },
    computed: {
        visible() {
            return this.value;
        },
        classes() {
            return {
                [`-${this.variant}`]: Boolean(this.variant),
                [`-${this.size}`]: Boolean(this.size),
                '-dismissible': this.dismissible,
                '-with-icon': Boolean(this.$slots.icon)
            }
        }
    },
    methods: {
        dismiss() {
            this.dismissed = true;

            this.$emit('input', false);
        },
    },
    watch: {
        value(value) {
            this.dismissed = !value;
        }
    }
};
