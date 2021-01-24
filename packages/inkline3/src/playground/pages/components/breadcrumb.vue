<template>
    <article>
        <h1>Breadcrumb</h1>

        <example :component="Index" />
        <example :component="DynamicallyGenerated" />
        <example :component="ColorVariants" />
        <example :component="SizeVariants" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import Index from '@inkline/inkline/src/components/IBreadcrumb/examples/index.vue';
import DynamicallyGenerated from '@inkline/inkline/src/components/IBreadcrumb/examples/dynamically-generated.vue';
import ColorVariants from '@inkline/inkline/src/components/IBreadcrumb/examples/color-variants.vue';
import SizeVariants from '@inkline/inkline/src/components/IBreadcrumb/examples/size-variants.vue';

export default {
    setup() {
        return {
            Index: markRaw(Index),
            DynamicallyGenerated: markRaw(DynamicallyGenerated),
            ColorVariants: markRaw(ColorVariants),
            SizeVariants: markRaw(SizeVariants),
        };
    }
}
</script>
