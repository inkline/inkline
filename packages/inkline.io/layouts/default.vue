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

<style lang="stylus">
@require '~@inkline/inkline/css/config/index'
@require '~@inkline/inkline/css/mixins/index'
</style>

<script>
import Navbar from '@components/Navbar';
import Layout from "@components/Layout";
import { IContainer, IColumn, IRow } from '@inkline/inkline';

import {on} from "@inkline/inkline/src/helpers";

export default {
    name: 'Default',
    extends: Layout,
    head: {
        titleTemplate: '%s - Inkline'
    },
    components: {
        IContainer,
        IColumn,
        IRow,
        Navbar
    },
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
        on(window, 'scroll', this.onScroll);
        this.onScroll();
    }
};
</script>
