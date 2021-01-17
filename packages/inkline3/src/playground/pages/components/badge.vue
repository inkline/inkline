<template>
    <article>
        <h1>Badge</h1>

        <example :component="ColorVariants" />
        <example :component="SizeVariants" />
        <example :component="Heading" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import ColorVariants from '@inkline/inkline/src/components/IBadge/examples/color-variants.vue';
import SizeVariants from '@inkline/inkline/src/components/IBadge/examples/size-variants.vue';
import Heading from '@inkline/inkline/src/components/IBadge/examples/heading.vue';

export default {
    setup() {
        return {
            ColorVariants: markRaw(ColorVariants),
            SizeVariants: markRaw(SizeVariants),
            Heading: markRaw(Heading),
        };
    }
}
</script>
