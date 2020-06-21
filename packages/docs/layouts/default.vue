<template>
    <div id="default-layout">
        <navbar id="navbar" :class="navbarClass" />
        <i-layout>
            <i-layout-content>
                <nuxt />
            </i-layout-content>
        </i-layout>
    </div>
</template>
<script>
import Vue from 'vue';
import Layout from '~/components/layout/Layout';

import { on } from '@inkline/inkline/src/helpers';

export default {
    name: 'Default',
    extends: Layout,
    data () {
        return {
            navbarClass: {
                '-transparent': true
            }
        };
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
</script>
