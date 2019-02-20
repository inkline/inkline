<template>
<div id="default-layout">
    <navbar id="navbar" class="-transparent" />
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

#default-layout
    .navbar
        .logo.-light
            display: none;

        &.-transparent
            background: rgba(#e9ecef, 0.25)

            +-breakpoint-down(md)
                .brand
                    color: --colors['light']

                .logo
                    &.-light
                        display: inline-block;
                    &.-dark
                        display: none;

            +-breakpoint-up(lg)
                .brand
                    color: --colors['dark']

                .logo
                    &.-light
                        display: none;
                    &.-dark
                        display: inline-block;




        .nav
            > .item
                color: white
</style>

<script>
import Navbar from '@components/Navbar';
import Layout from "@components/Layout";
import { IContainer, IColumn, IRow } from '@inkline/inkline';

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
    }
};
</script>
