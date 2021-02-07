<template>
    <article>
        <h1>Float Utilities</h1>
        <example :component="IndexExample" />
        <example :component="ResponsiveExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import IndexExample from '@inkline/inkline/src/playground/pages/utilities/float/index.vue';
import ResponsiveExample from '@inkline/inkline/src/playground/pages/utilities/float/responsive.vue';

export default {
    setup() {
        return {
            IndexExample: markRaw(IndexExample),
            ResponsiveExample: markRaw(ResponsiveExample),
        };
    }
}
</script>
