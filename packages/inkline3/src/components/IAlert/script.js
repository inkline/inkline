import { sizeValidator } from "@inkline/inkline/src/validators";

export default {
    name: 'IAlert',
    props: {
        size: {
            type: String,
            default: '',
            validator: sizeValidator
        },
        color: {
            type: String,
            default: ''
        },
        modelValue: {
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
        classes() {
            return {
                [`-${this.color}`]: Boolean(this.color),
                [`-${this.size}`]: Boolean(this.size),
                '-dismissible': this.dismissible,
                '-with-icon': Boolean(this.$slots.icon)
            }
        }
    },
    methods: {
        dismiss() {
            this.dismissed = true;

            this.$emit('update:modelValue', false);
        },
    },
    watch: {
        modelValue(value) {
            this.dismissed = !value;
        }
    }
};
