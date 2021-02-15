<template>
    <article>
        <h1>Collapsible</h1>

        <example type="icon" :component="IndexExample" />
        <example type="icon" :component="ColorVariantsExample" />
        <example type="icon" :component="SizeVariantsExample" />
        <example type="icon" :component="AccordionExample" />
        <example type="icon" :component="DefaultOpenExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import IndexExample from '@inkline/inkline/src/components/ICollapsible/examples/index.vue';
import ColorVariantsExample from '@inkline/inkline/src/components/ICollapsible/examples/color-variants.vue';
import SizeVariantsExample from '@inkline/inkline/src/components/ICollapsible/examples/size-variants.vue';
import AccordionExample from '@inkline/inkline/src/components/ICollapsible/examples/accordion.vue';
import DefaultOpenExample from '@inkline/inkline/src/components/ICollapsible/examples/default-open.vue';

export default {
    setup() {
        return {
            IndexExample: markRaw(IndexExample),
            ColorVariantsExample: markRaw(ColorVariantsExample),
            SizeVariantsExample: markRaw(SizeVariantsExample),
            AccordionExample: markRaw(AccordionExample),
            DefaultOpenExample: markRaw(DefaultOpenExample),
        };
    }
}
</script>
