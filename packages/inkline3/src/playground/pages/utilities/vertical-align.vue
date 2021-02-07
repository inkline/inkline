<template>
    <article>
        <h1>Vertical Align Utilities</h1>

        <example :component="IndexExample" />
        <example :component="TableExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import IndexExample from '@inkline/inkline/src/playground/pages/utilities/vertical-align/index.vue';
import TableExample from '@inkline/inkline/src/playground/pages/utilities/vertical-align/table.vue';

export default {
    setup() {
        return {
            IndexExample: markRaw(IndexExample),
            TableExample: markRaw(TableExample)
        };
    }
}
</script>
