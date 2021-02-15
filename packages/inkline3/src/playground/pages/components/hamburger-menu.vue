<template>
    <article>
        <h1>Hamburger Menu</h1>

        <example :component="IndexExample" />
        <example :component="ColorVariantsExample" />
        <example :component="AnimationExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import IndexExample from '@inkline/inkline/src/components/IHamburgerMenu/examples/index.vue';
import ColorVariantsExample from '@inkline/inkline/src/components/IHamburgerMenu/examples/color-variants.vue';
import AnimationExample from '@inkline/inkline/src/components/IHamburgerMenu/examples/animation.vue';

export default {
    setup() {
        return {
            IndexExample: markRaw(IndexExample),
            ColorVariantsExample: markRaw(ColorVariantsExample),
            AnimationExample: markRaw(AnimationExample),
        };
    }
}
</script>
