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
            collapsed: false,
            collapsible: false,
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
                '-collapsed': this.collapsed,
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
        setCollapse(value) {
            this.collapsed = value;
        },
        toggleCollapse() {
            this.collapsed = !this.collapsed;
        },
        onWindowResize() {
            if (this.collapse === true) {
                this.collapsible = true;
                return;
            } else if (this.collapse === false) {
                return;
            }

            const windowWidth = window.innerWidth;

            if (this.windowWidth <= breakpoints[this.collapse][1] && windowWidth > breakpoints[this.collapse][1]) {
                this.collapsed = false;
            }

            this.collapsible = windowWidth <= breakpoints[this.collapse][1];
            this.windowWidth = windowWidth;
        }
    },
    watch: {
        modelValue(value) {
            this.collapsed = value;
        },
        collapsed(value) {
            this.$emit('update:modelValue', value);
        }
    }
};
