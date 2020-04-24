import IContainer from '@inkline/inkline/src/components/IContainer';
import IRow from '@inkline/inkline/src/components/IRow';
import IColumn from '@inkline/inkline/src/components/IColumn';
import IHamburgerMenu from '@inkline/inkline/src/components/IHamburgerMenu';
import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    CollapsibleProviderMixin,
    SizePropertyMixin,
    VariantPropertyMixin,
} from '@inkline/inkline/src/mixins';
import ClickOutside from '@inkline/inkline/src/directives/click-outside';


export default {
    name: 'INavbar',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        CollapsibleProviderMixin,

        SizePropertyMixin,
        VariantPropertyMixin
    ],
    components: {
        IContainer,
        IRow,
        IColumn,
        IHamburgerMenu
    },
    directives: {
        ClickOutside
    },
    props: {
        collapseOnClick: {
            type: Boolean,
            default: true
        },
        collapseOnClickOutside: {
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
    methods: {
        onClickItem() {
            if (this.collapseOnClick && this.collapsed) {
                this.setCollapse(false);
            }
        },
        onClickOutside() {
            if (this.collapseOnClickOutside && this.collapsed) {
                this.setCollapse(false);
            }
        }
    },
    created() {
        this.$on('item-click', this.onClickItem);
    },
    beforeDestroy() {
        this.$off('item-click', this.onClickItem);
    }
};
