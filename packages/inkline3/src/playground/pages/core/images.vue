<template>
    <article>
        <h1>Images</h1>

        <example type="no-margin" :component="Responsive" />
        <example type="no-margin" :component="Fluid" />
        <example type="no-margin" :component="Thumbnail" />
        <example type="no-margin" :component="Polaroid" />
        <example type="no-margin" :component="AlignmentLeft" />
        <example type="no-margin" :component="AlignmentRight" />
        <example type="no-margin" :component="AlignmentCenter" />
        <example type="no-margin" :component="AlignmentMarginAuto" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import Responsive from '@/playground/pages/core/images/responsive.vue';
import Fluid from '@/playground/pages/core/images/fluid.vue';
import Thumbnail from '@/playground/pages/core/images/thumbnail.vue';
import Polaroid from '@/playground/pages/core/images/polaroid.vue';
import AlignmentLeft from '@/playground/pages/core/images/alignment-left.vue';
import AlignmentRight from '@/playground/pages/core/images/alignment-right.vue';
import AlignmentCenter from '@/playground/pages/core/images/alignment-center.vue';
import AlignmentMarginAuto from '@/playground/pages/core/images/alignment-margin-auto.vue';

export default {
    setup() {
        return {
            Responsive: markRaw(Responsive),
            Fluid: markRaw(Fluid),
            Thumbnail: markRaw(Thumbnail),
            Polaroid: markRaw(Polaroid),
            AlignmentLeft: markRaw(AlignmentLeft),
            AlignmentRight: markRaw(AlignmentRight),
            AlignmentCenter: markRaw(AlignmentCenter),
            AlignmentMarginAuto: markRaw(AlignmentMarginAuto),
        };
    }
}
</script>
