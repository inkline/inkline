<template>
    <article>
        <h1>Visibility Utilities</h1>
        <example :component="IndexExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import IndexExample from '@inkline/inkline/src/playground/pages/utilities/visibility/index.vue';

export default {
    setup() {
        return {
            IndexExample: markRaw(IndexExample),
        };
    }
}
</script>
