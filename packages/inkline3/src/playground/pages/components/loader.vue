<template>
    <article>
        <h1>Loader</h1>

        <example :component="ColorVariants" />
        <example :component="SizeVariants" />
        <example :component="Text" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import ColorVariants from '@inkline/inkline/src/components/ILoader/examples/color-variants.vue';
import SizeVariants from '@inkline/inkline/src/components/ILoader/examples/size-variants.vue';
import Text from '@inkline/inkline/src/components/ILoader/examples/text.vue';

export default {
    setup() {
        return {
            ColorVariants: markRaw(ColorVariants),
            SizeVariants: markRaw(SizeVariants),
            Text: markRaw(Text),
        };
    }
}
</script>
