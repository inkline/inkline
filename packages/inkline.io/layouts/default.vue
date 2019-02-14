<template>
<div id="content">
    <navbar />
    <i-layout>
        <i-layout-content>
            <i-container>
                <i-row>
                    <i-column>
                        <nuxt />
                    </i-column>
                </i-row>
            </i-container>
        </i-layout-content>
    </i-layout>
</div>
</template>

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
