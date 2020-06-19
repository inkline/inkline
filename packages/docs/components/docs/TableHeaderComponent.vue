<template>
    <i-dropdown class="_margin-0">
        <span class="_cursor-pointer">
            Country <i-icon icon="caret-down" class="_margin-left-1-2" />
        </span>
        <i-dropdown-menu>
            <i-dropdown-item href="">
                Reset
            </i-dropdown-item>
            <i-dropdown-item href="">
                Show all
            </i-dropdown-item>
        </i-dropdown-menu>
    </i-dropdown>
</template>

<script>
/* eslint-disable vue/require-prop-types */

export default {
    name: 'TableHeaderComponent',
    props: ['column', 'index']
};
</script>
