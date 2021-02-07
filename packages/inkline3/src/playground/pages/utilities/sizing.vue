<template>
    <article>
        <h1>Sizing Utilities</h1>
        <example type="sizing" :component="WidthExample" />
        <example type="sizing -vertical" :component="HeightExample" />
        <example type="sizing" :component="MaxWidthExample" />
        <example type="sizing -vertical" :component="MaxHeightExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import WidthExample from '@inkline/inkline/src/playground/pages/utilities/sizing/width.vue';
import HeightExample from '@inkline/inkline/src/playground/pages/utilities/sizing/height.vue';
import MaxWidthExample from '@inkline/inkline/src/playground/pages/utilities/sizing/max-width.vue';
import MaxHeightExample from '@inkline/inkline/src/playground/pages/utilities/sizing/max-height.vue';

export default {
    setup() {
        return {
            WidthExample: markRaw(WidthExample),
            HeightExample: markRaw(HeightExample),
            MaxWidthExample: markRaw(MaxWidthExample),
            MaxHeightExample: markRaw(MaxHeightExample),
        };
    }
}
</script>
