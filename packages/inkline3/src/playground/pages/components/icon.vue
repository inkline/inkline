<template>
    <article>
        <h1>Icon</h1>

        <example type="icon" :component="IndexExample" />
        <example type="icon" :component="ColorVariantsExample" />
        <example type="icon" :component="SizeVariantsExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import IndexExample from '@inkline/inkline/src/components/IIcon/examples/index.vue';
import ColorVariantsExample from '@inkline/inkline/src/components/IIcon/examples/color-variants.vue';
import SizeVariantsExample from '@inkline/inkline/src/components/IIcon/examples/size-variants.vue';

export default {
    setup() {
        return {
            IndexExample: markRaw(IndexExample),
            ColorVariantsExample: markRaw(ColorVariantsExample),
            SizeVariantsExample: markRaw(SizeVariantsExample),
        };
    }
}
</script>
