<template>
    <article>
        <h1>Grid</h1>

        <example :component="Example" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import Example from '@/playground/pages/core/grid/index.vue';

export default {
    setup() {
        return {
            Example: markRaw(Example),
        };
    }
}
</script>
