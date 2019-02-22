import IContainer from '../Container';
import IRow from '../Row';
import IColumn from '../Column';

import AttributesProviderMixin from '@inkline/inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from '@inkline/inkline/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from '@inkline/inkline/mixins/components/properties/VariantPropertyMixin';

import { breakpoints } from '@inkline/inkline/constants';

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
        IColumn
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
    data() {
        return {
            collapsed: false,
            windowWidth: window.innerWidth
        };
    },
    props: {
        fluid: {
            type: Boolean,
            default: false
        },
        collapse: {
            type: String,
            default: 'md'
        },
        toggleAnimation: {
            type: String,
            default: 'close'
        }
    },
    methods: {
        toggleCollapse() {
            this.collapsed = !this.collapsed;
        },
        onWindowResize() {
            const windowWidth = window.innerWidth;

            if (this.windowWidth <= breakpoints[this.collapse][1] && windowWidth > breakpoints[this.collapse][1]) {
                this.collapsed = false;
            }

            this.windowWidth = windowWidth;
        }
    },
    created () {
        this.classesProvider.add(() => ({
            '-collapsed': this.collapsed,
            [`-collapse-${this.collapse}`]: Boolean(this.collapse)
        }));

        this.classesProvider.add('hamburger', () => ({
            '-active': this.collapsed,
            [`-${this.toggleAnimation}`]: true
        }));

        window.addEventListener('resize', this.onWindowResize);
        this.onWindowResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.onWindowResize)
    },
};