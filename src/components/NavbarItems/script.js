import Vue from 'vue';
import ITransitionExpand from '@inkline/inkline/src/transitions/TransitionExpand';
import { breakpoints } from "@inkline/inkline/src/constants";

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
            if (!this.navbar.collapse) { return; }

            this.collapsible = window.innerWidth <= breakpoints[this.navbar.collapse][1];
        }
    },
    created() {
        if (!Vue.$isServer && typeof window !== 'undefined') {
            window.addEventListener('resize', this.onWindowResize);
            this.onWindowResize();
        }
    },
    destroyed() {
        if (!Vue.$isServer && typeof window !== 'undefined') {
            window.removeEventListener('resize', this.onWindowResize)
        }
    }
};