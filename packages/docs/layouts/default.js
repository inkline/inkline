import Vue from 'vue';
import Layout from "@components/Layout";

import {on} from "@inkline/inkline/helpers";

export default {
    name: 'Default',
    extends: Layout,
    data () {
        return {
            navbarClass: {
                '-transparent': true
            }
        }
    },
    methods: {
        onScroll () {
            this.navbarClass['-transparent'] = (window.pageYOffset || document.documentElement.scrollTop) === 0;
        }
    },
    created () {
        if (!Vue.$isServer && typeof window !== 'undefined') {
            on(window, 'scroll', this.onScroll);
            this.onScroll();
        }
    }
};
