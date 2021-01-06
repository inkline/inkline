<template>
    <article>
        <h1>Images</h1>

        <example :component="Responsive" />
        <example :component="Fluid" />
        <example :component="Thumbnail" />
        <example :component="Polaroid" />
        <example :component="AlignmentLeft" />
        <example :component="AlignmentRight" />
        <example :component="AlignmentCenter" />
        <example :component="AlignmentMarginAuto" />
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
