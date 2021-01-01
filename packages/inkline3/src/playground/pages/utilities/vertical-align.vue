<template>
    <article>
        <h1>Vertical Align Utilities</h1>

        <example :component="Example" />
        <example :component="TableExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import Example from '@/playground/pages/utilities/vertical-align/index.vue';
import TableExample from '@/playground/pages/utilities/vertical-align/table.vue';

export default {
    setup() {
        return {
            Example: markRaw(Example),
            TableExample: markRaw(TableExample)
        };
    }
}
</script>
