<template>
    <article>
        <h1>List Group</h1>

        <example :component="IndexExample" />
        <example :component="ColorVariantsExample" />
        <example :component="SizeVariantsExample" />
        <example :component="StateActiveExample" />
        <example :component="StateDisabledExample" />
        <example :component="BorderlessExample" />
        <example :component="ContentExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import IndexExample from '@inkline/inkline/src/components/IListGroup/examples/index.vue';
import ColorVariantsExample from '@inkline/inkline/src/components/IListGroup/examples/color-variants.vue';
import SizeVariantsExample from '@inkline/inkline/src/components/IListGroup/examples/size-variants.vue';
import StateActiveExample from '@inkline/inkline/src/components/IListGroup/examples/state-active.vue';
import StateDisabledExample from '@inkline/inkline/src/components/IListGroup/examples/state-disabled.vue';
import BorderlessExample from '@inkline/inkline/src/components/IListGroup/examples/borderless.vue';
import ContentExample from '@inkline/inkline/src/components/IListGroup/examples/content.vue';

export default {
    setup() {
        return {
            IndexExample: markRaw(IndexExample),
            ColorVariantsExample: markRaw(ColorVariantsExample),
            SizeVariantsExample: markRaw(SizeVariantsExample),
            StateActiveExample: markRaw(StateActiveExample),
            StateDisabledExample: markRaw(StateDisabledExample),
            BorderlessExample: markRaw(BorderlessExample),
            ContentExample: markRaw(ContentExample),
        };
    }
}
</script>
