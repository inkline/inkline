import { on, off } from "@inkline/inkline/src/helpers";
import { breakpoints } from '@inkline/inkline/src/constants';

export default {
    props: {
        collapse: {
            type: [String, Boolean],
            default: 'md'
        },
        modelValue: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            open: this.modelValue
        };
    },
    provide() {
        return {
            navbar: this
        };
    },
    computed: {
        collapsibleClasses() {
            return {
                '-open': this.open,
                '-collapsible': this.collapsible,
                [`-collapse-${this.collapse}`]: Boolean(this.collapse)
            }
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            on(window, 'resize', this.onWindowResize);

            this.onWindowResize();
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            off(window, 'resize', this.onWindowResize);
        }
    },
    methods: {
        setOpen(value) {
            this.open = value;
            this.$emit('update:modelValue', this.open);
        },
        toggleOpen() {
            this.open = !this.open;
            this.$emit('update:modelValue', this.open);
        },
        onWindowResize() {
            if (this.collapse === true || this.collapse === false) {
                return;
            }

            const windowWidth = window.innerWidth;

            if (windowWidth <= breakpoints[this.collapse][1] && windowWidth > breakpoints[this.collapse][1]) {
                this.setOpen(false);
            }

            console.log(this.collapsible, this.open)
        }
    },
    watch: {
        modelValue(value) {
            this.open = value;
        }
    }
};
