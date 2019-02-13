import View from '@components/View';
import { IButton, INav, INavItem, INavbar, INavbarBrand, INavbarItems } from '@inkline/inkline';

export default {
    name: 'NavbarView',
    layout: 'documentation',
    extends: View,
    components: {
        IButton,
        INav,
        INavItem,
        INavbar,
        INavbarBrand,
        INavbarItems
    }
};
