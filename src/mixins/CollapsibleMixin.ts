import { defineComponent } from 'vue';
import { on, off } from '@inkline/inkline/helpers';
import { breakpoints } from '@inkline/inkline/constants';
import { Classes } from '@inkline/inkline/types';

export default defineComponent({
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
    emits: ['update:modelValue'],
    data () {
        return {
            open: this.modelValue,
            windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0
        };
    },
    computed: {
        collapsibleClasses (): Classes {
            return {
                '-open': this.open,
                '-collapsible': this.collapsible,
                [`-collapse-${this.collapse}`]: Boolean(this.collapse)
            };
        },
        collapsible (): boolean {
            if (this.collapse === true || this.collapse === false) {
                return this.collapse;
            }

            return this.windowWidth <= breakpoints[this.collapse][1];
        }
    },
    watch: {
        modelValue (value) {
            this.open = value;
        }
    },
    created () {
        if (typeof window !== 'undefined') {
            on(window as any, 'resize', this.onWindowResize);

            this.onWindowResize();
        }
    },
    beforeUnmount () {
        if (typeof window !== 'undefined') {
            off(window as any, 'resize', this.onWindowResize);
        }
    },
    methods: {
        setOpen (value: boolean) {
            this.open = value;
            this.$emit('update:modelValue', this.open);
        },
        toggleOpen () {
            this.open = !this.open;
            this.$emit('update:modelValue', this.open);
        },
        onWindowResize () {
            if (this.collapse === true || this.collapse === false || typeof window === 'undefined') {
                return;
            }

            const windowWidth = window.innerWidth;

            if (this.windowWidth <= breakpoints[this.collapse][1] && windowWidth > breakpoints[this.collapse][1]) {
                this.setOpen(false);
            }

            this.windowWidth = window.innerWidth;
        }
    }
});
