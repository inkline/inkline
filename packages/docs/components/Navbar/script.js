import { INavbar, INavbarBrand, INavbarItems, INav, INavItem, IHamburgerMenu, IIcon } from '@inkline/inkline/src/index';

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
        IHamburgerMenu,
        IIcon
    },
    data() {
        return {
            sidebarOpen: false
        };
    },
    computed: {
        variantIcon() {
            return this.$inkline.config.variant || 'light';
        }
    },
    methods: {
        toggleSidebar() {
            this.$emit('toggle');
        },
        toggleDarkMode() {
            this.$inkline.config.variant = this.$inkline.config.variant === 'light' ? 'dark' : 'light';
        }
    },
    mounted() {
        this.$on('sidebarToggle', (value) => {
            this.sidebarOpen = value;
        })
    }
};
