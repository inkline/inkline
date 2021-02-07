<template>
    <article>
        <h1>Flex Utilities</h1>
        <example type="flex" :component="FlexExample" />
        <example type="flex" :component="InlineFlexExample" />
        <example type="flex" :component="FlexDirectionRowExample" />
        <example type="flex" :component="FlexDirectionColumnExample" />
        <example type="flex" :component="JustifyContentExample" />
        <example type="flex" :component="AlignItemsExample" />
        <example type="flex -tall" :component="AlignSelfExample" />
        <example type="flex -tall" :component="AlignContentExample" />
        <example type="flex" :component="FlexFillExample" />
        <example type="flex" :component="FlexGrowExample" />
        <example type="flex" :component="FlexShrinkExample" />
        <example type="flex" :component="MarginAutoExample" />
        <example type="flex" :component="FlexWrapExample" />
        <example type="flex" :component="OrderExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import FlexExample from '@inkline/inkline/src/playground/pages/utilities/flex/flex.vue';
import InlineFlexExample from '@inkline/inkline/src/playground/pages/utilities/flex/inline-flex.vue';
import FlexDirectionRowExample from '@inkline/inkline/src/playground/pages/utilities/flex/flex-direction-row.vue';
import FlexDirectionColumnExample from '@inkline/inkline/src/playground/pages/utilities/flex/flex-direction-column.vue';
import JustifyContentExample from '@inkline/inkline/src/playground/pages/utilities/flex/justify-content.vue';
import AlignItemsExample from '@inkline/inkline/src/playground/pages/utilities/flex/align-items.vue';
import AlignSelfExample from '@inkline/inkline/src/playground/pages/utilities/flex/align-self.vue';
import AlignContentExample from '@inkline/inkline/src/playground/pages/utilities/flex/align-content.vue';
import FlexFillExample from '@inkline/inkline/src/playground/pages/utilities/flex/flex-fill.vue';
import FlexGrowExample from '@inkline/inkline/src/playground/pages/utilities/flex/flex-grow.vue';
import FlexShrinkExample from '@inkline/inkline/src/playground/pages/utilities/flex/flex-shrink.vue';
import MarginAutoExample from '@inkline/inkline/src/playground/pages/utilities/flex/margin-auto.vue';
import FlexWrapExample from '@inkline/inkline/src/playground/pages/utilities/flex/flex-wrap.vue';
import OrderExample from '@inkline/inkline/src/playground/pages/utilities/flex/order.vue';

export default {
    setup() {
        return {
            FlexExample: markRaw(FlexExample),
            InlineFlexExample: markRaw(InlineFlexExample),
            FlexDirectionRowExample: markRaw(FlexDirectionRowExample),
            FlexDirectionColumnExample: markRaw(FlexDirectionColumnExample),
            JustifyContentExample: markRaw(JustifyContentExample),
            AlignItemsExample: markRaw(AlignItemsExample),
            AlignSelfExample: markRaw(AlignSelfExample),
            AlignContentExample: markRaw(AlignContentExample),
            FlexFillExample: markRaw(FlexFillExample),
            FlexGrowExample: markRaw(FlexGrowExample),
            FlexShrinkExample: markRaw(FlexShrinkExample),
            MarginAutoExample: markRaw(MarginAutoExample),
            FlexWrapExample: markRaw(FlexWrapExample),
            OrderExample: markRaw(OrderExample),
        };
    }
}
</script>
