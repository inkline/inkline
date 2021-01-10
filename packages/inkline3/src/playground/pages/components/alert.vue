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
import Example from '@/components/IAlert/examples/index.vue';
import Variants from '@/components/IAlert/examples/variants.vue';
import Sizes from '@/components/IAlert/examples/sizes.vue';
import Elements from '@/components/IAlert/examples/elements.vue';
import Icon from '@/components/IAlert/examples/icon.vue';
import Dismissible from '@/components/IAlert/examples/dismissible.vue';

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
