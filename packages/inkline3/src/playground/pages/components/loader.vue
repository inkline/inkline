<template>
    <article>
        <h1>Loader</h1>

        <example :component="ColorVariants" />
        <example :component="SizeVariants" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import ColorVariants from '@inkline/inkline/src/components/ILoader/examples/color-variants.vue';
import SizeVariants from '@inkline/inkline/src/components/ILoader/examples/size-variants.vue';

export default {
    setup() {
        return {
            ColorVariants: markRaw(ColorVariants),
            SizeVariants: markRaw(SizeVariants),
        };
    }
}
</script>
