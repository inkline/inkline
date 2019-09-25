import SiteSearch from '@components/SiteSearch';

export default {
    name: 'Navbar',
    components: {
        SiteSearch
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
