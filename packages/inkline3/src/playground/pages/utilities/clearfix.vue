<template>
    <article>
        <h1>Clearfix Utilities</h1>
        <example type="clearfix" :component="Index" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import Index from '@inkline/inkline/src/playground/pages/utilities/clearfix/index.vue';

export default {
    setup() {
        return {
            Index: markRaw(Index),
        };
    }
}
</script>
