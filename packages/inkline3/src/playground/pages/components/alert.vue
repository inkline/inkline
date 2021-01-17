<template>
    <article>
        <h1>Alert</h1>

        <example :component="Index" />
        <example :component="ColorVariants" />
        <example :component="SizeVariants" />
        <example :component="Elements" />
        <example :component="Icon" />
        <example :component="Dismissible" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import Index from '@inkline/inkline/src/components/IAlert/examples/index.vue';
import ColorVariants from '@inkline/inkline/src/components/IAlert/examples/color-variants.vue';
import SizeVariants from '@inkline/inkline/src/components/IAlert/examples/size-variants.vue';
import Elements from '@inkline/inkline/src/components/IAlert/examples/elements.vue';
import Icon from '@inkline/inkline/src/components/IAlert/examples/icon.vue';
import Dismissible from '@inkline/inkline/src/components/IAlert/examples/dismissible.vue';

export default {
    setup() {
        return {
            Index: markRaw(Index),
            ColorVariants: markRaw(ColorVariants),
            SizeVariants: markRaw(SizeVariants),
            Elements: markRaw(Elements),
            Icon: markRaw(Icon),
            Dismissible: markRaw(Dismissible),
        };
    }
}
</script>
