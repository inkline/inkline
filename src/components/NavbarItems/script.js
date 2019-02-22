import ITransitionExpand from '@inkline/inkline/transitions/TransitionExpand';
import { breakpoints } from "@inkline/inkline/constants";

export default {
    name: 'INavbarItems',
    inject: [ 'navbar' ],
    components: {
        ITransitionExpand
    },
    data() {
        return {
            collapsible: false
        }
    },
    methods: {
        onWindowResize() {
            this.collapsible = window.innerWidth <= breakpoints[this.navbar.collapse][1];
        }
    },
    created () {
        window.addEventListener('resize', this.onWindowResize);
        this.onWindowResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.onWindowResize)
    }
};