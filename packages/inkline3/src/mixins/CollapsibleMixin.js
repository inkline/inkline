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
            open: this.modelValue,
            windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0
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
        },
        collapsible() {
            if (this.collapse === true || this.collapse === false) {
                return this.collapse;
            }

            return this.windowWidth <= breakpoints[this.collapse][1];
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

            if (this.windowWidth <= breakpoints[this.collapse][1] && windowWidth > breakpoints[this.collapse][1]) {
                this.setOpen(false);
            }

            this.windowWidth = window.innerWidth;
        }
    },
    watch: {
        modelValue(value) {
            this.open = value;
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
};
