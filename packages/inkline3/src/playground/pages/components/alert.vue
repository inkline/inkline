<template>
    <article>
        <h1>Alert</h1>

        <example :component="Example" />
        <example :component="Variants" />
        <example :component="Sizes" />
        <example :component="Elements" />
        <example :component="Icon" />
        <example :component="Dismissible" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import Example from '@/playground/pages/components/alert/index.vue';
import Variants from '@/playground/pages/components/alert/variants.vue';
import Sizes from '@/playground/pages/components/alert/sizes.vue';
import Elements from '@/playground/pages/components/alert/elements.vue';
import Icon from '@/playground/pages/components/alert/icon.vue';
import Dismissible from '@/playground/pages/components/alert/dismissible.vue';

export default {
    setup() {
        return {
            Example: markRaw(Example),
            Variants: markRaw(Variants),
            Sizes: markRaw(Sizes),
            Elements: markRaw(Elements),
            Icon: markRaw(Icon),
            Dismissible: markRaw(Dismissible),
        };
    }
}
</script>
