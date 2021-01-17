<template>
    <article>
        <h1>Vertical Align Utilities</h1>

        <example :component="Index" />
        <example :component="Table" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import Index from '@inkline/inkline/src/playground/pages/utilities/vertical-align/index.vue';
import Table from '@inkline/inkline/src/playground/pages/utilities/vertical-align/table.vue';

export default {
    setup() {
        return {
            Index: markRaw(Index),
            Table: markRaw(Table)
        };
    }
}
</script>
