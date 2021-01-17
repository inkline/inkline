<template>
    <article>
        <h1>Border Utilities</h1>

        <example type="border-utilities" :component="AddExample" />
        <example type="border-utilities-with-border" :component="RemoveExample" />
        <example type="border-utilities-with-border" :component="ColorBrandExample" />
        <example type="border-utilities-with-border" :component="ColorNeutralExample" />
        <example type="border-utilities-with-border" :component="ColorStateExample" />
        <example type="border-utilities-with-border" :component="RadiusExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import AddExample from '@inkline/inkline/src/playground/pages/utilities/border/add.vue';
import RemoveExample from '@inkline/inkline/src/playground/pages/utilities/border/remove.vue';
import ColorBrandExample from '@inkline/inkline/src/playground/pages/utilities/border/color-brand.vue';
import ColorNeutralExample from '@inkline/inkline/src/playground/pages/utilities/border/color-neutral.vue';
import ColorStateExample from '@inkline/inkline/src/playground/pages/utilities/border/color-state.vue';
import RadiusExample from '@inkline/inkline/src/playground/pages/utilities/border/radius.vue';

export default {
    setup() {
        return {
            AddExample: markRaw(AddExample),
            RemoveExample: markRaw(RemoveExample),
            ColorBrandExample: markRaw(ColorBrandExample),
            ColorNeutralExample: markRaw(ColorNeutralExample),
            ColorStateExample: markRaw(ColorStateExample),
            RadiusExample: markRaw(RadiusExample),
        };
    }
}
</script>
