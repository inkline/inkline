<template>
    <article>
        <h1>Tables</h1>

        <example :component="Index" />
        <example :component="Bordered" />
        <example :component="Striped" />
        <example :component="Hover" />
        <example :component="Responsive" />
        <example :component="ColorVariants" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import Index from '@inkline/inkline/src/components/ITable/examples/index.vue';
import Bordered from '@inkline/inkline/src/components/ITable/examples/bordered.vue';
import Striped from '@inkline/inkline/src/components/ITable/examples/striped.vue';
import Hover from '@inkline/inkline/src/components/ITable/examples/hover.vue';
import Responsive from '@inkline/inkline/src/components/ITable/examples/responsive.vue';
import ColorVariants from '@inkline/inkline/src/components/ITable/examples/color-variants.vue';

export default {
    setup() {
        return {
            Index: markRaw(Index),
            Bordered: markRaw(Bordered),
            Striped: markRaw(Striped),
            Hover: markRaw(Hover),
            Responsive: markRaw(Responsive),
            ColorVariants: markRaw(ColorVariants),
        };
    }
}
</script>
