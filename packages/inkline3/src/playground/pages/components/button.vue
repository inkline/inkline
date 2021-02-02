<template>
    <article>
        <h1>Button</h1>

        <example :component="ColorVariants" />
        <example :component="ButtonType" />
        <example :component="ButtonTag" />
        <example :component="Outline" />
        <example :component="Link" />
        <example :component="Circle" />
        <example :component="SizeVariants" />
        <example :component="Block" />
        <example :component="SocialColorVariants" />
        <example :component="Icon" />
        <example :component="StateActive" />
        <example :component="StateDisabled" />
        <example :component="StateLoading" />
        <example :component="Routing" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import ColorVariants from '@inkline/inkline/src/components/IButton/examples/color-variants.vue';
import ButtonType from '@inkline/inkline/src/components/IButton/examples/button-type.vue';
import ButtonTag from '@inkline/inkline/src/components/IButton/examples/button-tag.vue';
import Outline from '@inkline/inkline/src/components/IButton/examples/outline.vue';
import Link from '@inkline/inkline/src/components/IButton/examples/link.vue';
import Circle from '@inkline/inkline/src/components/IButton/examples/circle.vue';
import SizeVariants from '@inkline/inkline/src/components/IButton/examples/size-variants.vue';
import Block from '@inkline/inkline/src/components/IButton/examples/block.vue';
import SocialColorVariants from '@inkline/inkline/src/components/IButton/examples/social-color-variants.vue';
import Icon from '@inkline/inkline/src/components/IButton/examples/icon.vue';
import StateActive from '@inkline/inkline/src/components/IButton/examples/state-active.vue';
import StateDisabled from '@inkline/inkline/src/components/IButton/examples/state-disabled.vue';
import StateLoading from '@inkline/inkline/src/components/IButton/examples/state-loading.vue';
import Routing from '@inkline/inkline/src/components/IButton/examples/routing.vue';

export default {
    setup() {
        return {
            ColorVariants: markRaw(ColorVariants),
            ButtonType: markRaw(ButtonType),
            ButtonTag: markRaw(ButtonTag),
            Outline: markRaw(Outline),
            Link: markRaw(Link),
            Circle: markRaw(Circle),
            SizeVariants: markRaw(SizeVariants),
            Block: markRaw(Block),
            SocialColorVariants: markRaw(SocialColorVariants),
            Icon: markRaw(Icon),
            StateActive: markRaw(StateActive),
            StateDisabled: markRaw(StateDisabled),
            StateLoading: markRaw(StateLoading),
            Routing: markRaw(Routing),
        };
    }
}
</script>
