<template>
    <article>
        <h1>Clearfix Utilities</h1>

        <example type="clearfix" :component="Example" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import Example from '@/playground/pages/utilities/clearfix/index.vue';

export default {
    setup() {
        return {
            Example: markRaw(Example),
        };
    }
}
</script>
