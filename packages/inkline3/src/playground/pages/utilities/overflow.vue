<template>
    <article>
        <h1>Overflow Utilities</h1>
        <example type="overflow" :component="IndexExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import IndexExample from '@inkline/inkline/src/playground/pages/utilities/overflow/index.vue';

export default {
    setup() {
        return {
            IndexExample: markRaw(IndexExample),
        };
    }
}
</script>
