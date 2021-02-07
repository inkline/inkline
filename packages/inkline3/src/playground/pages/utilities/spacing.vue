<template>
    <article>
        <h1>Overlay Utilities</h1>
        <example type="spacing -vertical" :component="TopExample" />
        <example type="spacing" :component="RightExample" />
        <example type="spacing -vertical" :component="BottomExample" />
        <example type="spacing" :component="LeftExample" />
        <example type="spacing" :component="HorizontalCenterExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import TopExample from '@inkline/inkline/src/playground/pages/utilities/spacing/top.vue';
import RightExample from '@inkline/inkline/src/playground/pages/utilities/spacing/right.vue';
import BottomExample from '@inkline/inkline/src/playground/pages/utilities/spacing/bottom.vue';
import LeftExample from '@inkline/inkline/src/playground/pages/utilities/spacing/left.vue';
import HorizontalCenterExample from '@inkline/inkline/src/playground/pages/utilities/spacing/horizontal-center.vue';

export default {
    setup() {
        return {
            TopExample: markRaw(TopExample),
            RightExample: markRaw(RightExample),
            BottomExample: markRaw(BottomExample),
            LeftExample: markRaw(LeftExample),
            HorizontalCenterExample: markRaw(HorizontalCenterExample),
        };
    }
}
</script>
