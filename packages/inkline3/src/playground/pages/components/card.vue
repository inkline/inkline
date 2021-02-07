<template>
    <article>
        <h1>Button</h1>

        <example type="card" :component="IndexExample" />
        <example type="card" :component="CardBodyExample" />
        <example type="card" :component="CardHeaderFooterExample" />
        <example type="card" :component="ColorVariantsExample" />
        <example type="card" :component="SizeVariantsExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import IndexExample from '@inkline/inkline/src/components/ICard/examples/index.vue';
import CardBodyExample from '@inkline/inkline/src/components/ICard/examples/card-body.vue';
import CardHeaderFooterExample from '@inkline/inkline/src/components/ICard/examples/card-header-footer.vue';
import ColorVariantsExample from '@inkline/inkline/src/components/ICard/examples/color-variants.vue';
import SizeVariantsExample from '@inkline/inkline/src/components/ICard/examples/size-variants.vue';

export default {
    setup() {
        return {
            IndexExample: markRaw(IndexExample),
            CardBodyExample: markRaw(CardBodyExample),
            CardHeaderFooterExample: markRaw(CardHeaderFooterExample),
            ColorVariantsExample: markRaw(ColorVariantsExample),
            SizeVariantsExample: markRaw(SizeVariantsExample),
        };
    }
}
</script>
