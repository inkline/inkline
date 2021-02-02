<template>
    <article>
        <h1>Button Group</h1>

        <example :component="Index" />
        <example :component="Block" />
        <example :component="Nested" />
        <example :component="NestedBlock" />
        <example :component="Vertical" />
        <example :component="VerticalBlock" />
        <example :component="SizeVariants" />
        <example :component="VerticalSizeVariants" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import Index from '@inkline/inkline/src/components/IButtonGroup/examples/index.vue';
import Block from '@inkline/inkline/src/components/IButtonGroup/examples/block.vue';
import Nested from '@inkline/inkline/src/components/IButtonGroup/examples/nested.vue';
import NestedBlock from '@inkline/inkline/src/components/IButtonGroup/examples/nested-block.vue';
import Vertical from '@inkline/inkline/src/components/IButtonGroup/examples/vertical.vue';
import VerticalBlock from '@inkline/inkline/src/components/IButtonGroup/examples/vertical-block.vue';
import SizeVariants from '@inkline/inkline/src/components/IButtonGroup/examples/size-variants.vue';
import VerticalSizeVariants from '@inkline/inkline/src/components/IButtonGroup/examples/vertical-size-variants.vue';

export default {
    setup() {
        return {
            Index: markRaw(Index),
            Block: markRaw(Block),
            Nested: markRaw(Nested),
            NestedBlock: markRaw(NestedBlock),
            Vertical: markRaw(Vertical),
            VerticalBlock: markRaw(VerticalBlock),
            SizeVariants: markRaw(SizeVariants),
            VerticalSizeVariants: markRaw(VerticalSizeVariants),
        };
    }
}
</script>
