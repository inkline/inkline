import { INavbar, INavbarBrand, INavbarItems, INav, INavItem, IHamburgerMenu } from '@inkline/inkline/src/index';

import SiteSearch from '@components/SiteSearch';

export default {
    name: 'Navbar',
    components: {
        SiteSearch,
        INavbar,
        INavbarBrand,
        INavbarItems,
        INav,
        INavItem,
        IHamburgerMenu
    },
    data() {
        return {
            sidebarOpen: false
        };
    },
    methods: {
        toggleSidebar() {
            this.$emit('toggle');
        }
    },
    mounted() {
        this.$on('sidebarToggle', (value) => {
            this.sidebarOpen = value;
        })
    }
};
