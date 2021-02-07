<template>
    <article>
        <h1>Overlay Utilities</h1>
        <example :component="IndexExample" />
        <example type="card" :component="LinkExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import IndexExample from '@inkline/inkline/src/playground/pages/utilities/overlay/index.vue';
import LinkExample from '@inkline/inkline/src/playground/pages/utilities/overlay/link.vue';

export default {
    setup() {
        return {
            IndexExample: markRaw(IndexExample),
            LinkExample: markRaw(LinkExample),
        };
    }
}
</script>
