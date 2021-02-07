<template>
    <article>
        <h1>Display Utilities</h1>
        <example :component="InlineExample" />
        <example :component="BlockExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import InlineExample from '@inkline/inkline/src/playground/pages/utilities/display/inline.vue';
import BlockExample from '@inkline/inkline/src/playground/pages/utilities/display/block.vue';

export default {
    setup() {
        return {
            InlineExample: markRaw(InlineExample),
            BlockExample: markRaw(BlockExample),
        };
    }
}
</script>
