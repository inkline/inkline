<template>
    <article>
        <h1>Header</h1>

        <example :component="IndexExample" />
        <example :component="ColorVariantsExample" />
        <example :component="SizeVariantsExample" />
        <example :component="FullscreenExample" />
        <example :component="CoverExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import IndexExample from '@inkline/inkline/src/components/IHeader/examples/index.vue';
import ColorVariantsExample from '@inkline/inkline/src/components/IHeader/examples/color-variants.vue';
import SizeVariantsExample from '@inkline/inkline/src/components/IHeader/examples/size-variants.vue';
import FullscreenExample from '@inkline/inkline/src/components/IHeader/examples/fullscreen.vue';
import CoverExample from '@inkline/inkline/src/components/IHeader/examples/cover.vue';

export default {
    setup() {
        return {
            IndexExample: markRaw(IndexExample),
            ColorVariantsExample: markRaw(ColorVariantsExample),
            SizeVariantsExample: markRaw(SizeVariantsExample),
            FullscreenExample: markRaw(FullscreenExample),
            CoverExample: markRaw(CoverExample),
        };
    }
}
</script>
