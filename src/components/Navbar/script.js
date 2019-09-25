import Vue from 'vue';
import IContainer from '../Container';
import IRow from '../Row';
import IColumn from '../Column';
import IHamburgerMenu from '../HamburgerMenu';

import AttributesProviderMixin from '@inkline/inkline/src/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from '@inkline/inkline/src/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from '@inkline/inkline/src/mixins/components/properties/VariantPropertyMixin';

import { breakpoints } from '@inkline/inkline/src/constants';

export default {
    name: 'INavbar',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        SizePropertyMixin,
        VariantPropertyMixin
    ],
    components: {
        IContainer,
        IRow,
        IColumn,
        IHamburgerMenu
    },
    props: {
        collapse: {
            type: String,
            default: 'md'
        },
        collapseOnClick: {
            type: Boolean,
            default: true
        },
        fluid: {
            type: Boolean,
            default: false
        },
        toggleAnimation: {
            type: String,
            default: 'close'
        }
    },
    data() {
        return {
            collapsed: false,
            windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0
        };
    },
    provide() {
        const navbar = {};

        Object.defineProperty(navbar, 'collapsed', {
            enumerable: true,
            get: () => this.collapsed,
        });

        Object.defineProperty(navbar, 'collapse', {
            enumerable: true,
            get: () => this.collapse,
        });

        return { navbar };
    },
    methods: {
        setCollapse(value) {
            this.collapsed = value;
        },
        toggleCollapse() {
            this.collapsed = !this.collapsed;
        },
        onWindowResize() {
            if (!this.collapse) { return; }

            const windowWidth = window.innerWidth;

            if (this.windowWidth <= breakpoints[this.collapse][1] && windowWidth > breakpoints[this.collapse][1]) {
                this.collapsed = false;
            }

            this.windowWidth = windowWidth;
        }
    },
    created() {
        this.classesProvider.add(() => ({
            '-collapsed': this.collapsed,
            [`-collapse-${this.collapse}`]: Boolean(this.collapse)
        }));

        if (!Vue.$isServer && typeof window !== 'undefined') {
            window.addEventListener('resize', this.onWindowResize);
            this.onWindowResize();
        }

        if (this.collapseOnClick) {
            this.$on('item-click', () => this.setCollapse(false));
        }
    },
    destroyed() {
        if (!Vue.$isServer && typeof window !== 'undefined') {
            window.removeEventListener('resize', this.onWindowResize)
        }
    },
};
