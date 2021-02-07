<template>
    <article>
        <h1>Clearfix Utilities</h1>
        <example type="clearfix" :component="IndexExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import IndexExample from '@inkline/inkline/src/playground/pages/utilities/clearfix/index.vue';

export default {
    setup() {
        return {
            IndexExample: markRaw(IndexExample),
        };
    }
}
</script>
