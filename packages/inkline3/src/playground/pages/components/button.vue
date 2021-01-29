<template>
    <article>
        <h1>Button</h1>

        <example :component="ColorVariants" />
        <example :component="SizeVariants" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import ColorVariants from '@inkline/inkline/src/components/IButton/examples/color-variants.vue';
import SizeVariants from '@inkline/inkline/src/components/IButton/examples/size-variants.vue';

export default {
    setup() {
        return {
            ColorVariants: markRaw(ColorVariants),
            SizeVariants: markRaw(SizeVariants),
        };
    }
}
</script>
