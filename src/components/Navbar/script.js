import IContainer from '../Container';
import IRow from '../Row';
import IColumn from '../Column';
import IHamburgerMenu from '../HamburgerMenu';

import AttributesProviderMixin from '@inkline/inkline/src/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';
import CollapsibleProviderMixin from '@inkline/inkline/src/mixins/components/providers/CollapsibleProviderMixin';

import SizePropertyMixin from '@inkline/inkline/src/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from '@inkline/inkline/src/mixins/components/properties/VariantPropertyMixin';


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
    props: {
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
    created() {
        this.$on('item-click', () => {
            this.setCollapse(false);
        });
    }
};
