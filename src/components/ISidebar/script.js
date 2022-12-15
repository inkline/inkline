import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    CollapsibleProviderMixin,
    SizePropertyMixin,
    VariantPropertyMixin,
} from '@inkline/inkline/src/mixins';

export default {
    name: 'ISidebar',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        CollapsibleProviderMixin,

        SizePropertyMixin,
        VariantPropertyMixin
    ],
    props: {
        collapseOnClick: {
            type: Boolean,
            default: true
        },
        collapseOnClickOverlay: {
            type: Boolean,
            default: true
        },
        collapsePosition: {
            type: String,
            default: 'fixed'
        },
        placement: {
            type: String,
            default: 'left'
        }
    },
    computed: {
        sidebarWrapperTransition() {
            return this.collapsePosition !== 'relative' ?
                'sidebar-wrapper-none-transition' :
                'sidebar-wrapper-transition';
        },
        sidebarTransition() {
            return this.collapsePosition !== 'relative' ?
                'sidebar-transition' :
                'sidebar-none-transition';
        }
    },
    created() {
        this.$on('item-click', this.onItemClick);

        this.classesProvider.add(() => ({
            [`-collapse-${this.collapsePosition}`]: true,
            [`-placement-${this.placement}`]: true
        }));
    },
    beforeDestroy() {
        this.$off('item-click', this.onItemClick);
    },
    methods: {
        onItemClick() {
            if (this.collapseOnClick && this.collapsed) {
                this.setCollapse(false);
            }
        },
        onOverlayClick() {
            if (this.collapseOnClickOverlay && this.collapsed) {
                this.setCollapse(false);
            }
        }
    }
};
