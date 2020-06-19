<template>
    <i-progress>
        <i-progress-bar :value="row.progress" />
    </i-progress>
</template>

<script>
/* eslint-disable vue/require-prop-types */

export default {
    name: 'TableProgress',
    props: ['row', 'column', 'index']
};
</script>
