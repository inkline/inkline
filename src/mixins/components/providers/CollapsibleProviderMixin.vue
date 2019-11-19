<script>
import Vue from 'vue';
import { breakpoints } from '@inkline/inkline/src/constants';

export default {
    props: {
        collapse: {
            type: [String, Boolean],
            default: 'md'
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            collapsed: false,
            collapsible: false,
            windowWidth: !Vue.prototype.$isServer && typeof window !== 'undefined' ? window.innerWidth : 0
        };
    },
    provide() {
        const collapsible = {};

        ['collapse', 'collapsible'].forEach((propertyName) => {
            Object.defineProperty(collapsible, propertyName, {
                enumerable: true,
                get: () => this[propertyName]
            });
        });

        Object.defineProperty(collapsible, 'collapsed', {
            enumerable: true,
            get: () => this.collapsed
        });

        return { collapsible };
    },
    watch: {
        value(value) {
            this.collapsed = value;
        },
        collapsed(value) {
            this.$emit('input', value);
        }
    },
    created() {
        if (this.classesProvider) {
            this.classesProvider.add(() => ({
                '-collapsed': this.collapsed,
                [`-collapse-${this.collapse}`]: Boolean(this.collapse)
            }));
        }

        if (!this.$isServer && typeof window !== 'undefined') {
            window.addEventListener('resize', this.onWindowResize);
            this.onWindowResize();
        }

        this.$on('collapse', this.setCollapse);
        this.$on('toggle-collapse', this.toggleCollapse);
    },
    beforeDestroy() {
        if (!this.$isServer && typeof window !== 'undefined') {
            window.removeEventListener('resize', this.onWindowResize)
        }

        this.$off('collapse', this.setCollapse);
        this.$off('toggle-collapse', this.toggleCollapse);
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
};
</script>
