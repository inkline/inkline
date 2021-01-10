<template>
    <article id="core-grid-page">
        <h1>Grid</h1>

        <example :component="Example" />
        <example :component="Offset" />
        <example :component="OffsetReset" />
        <example :component="PushPull" />
        <example :component="AutoWidth" />
        <example id="nested-example" :component="Nested" />
        <example :component="HorizontalAlignmentStart" />
        <example :component="HorizontalAlignmentCenter" />
        <example :component="HorizontalAlignmentEnd" />
        <example :component="VerticalAlignmentTop" />
        <example :component="HorizontalAlignmentEnd" />
        <example :component="VerticalAlignmentMiddle" />
        <example :component="VerticalAlignmentBottom" />
        <example :component="DistributionAround" />
        <example :component="DistributionBetween" />
        <example :component="ReorderingReverse" />
        <example :component="ReorderingFirst" />
        <example :component="ReorderingLast" />
        <example :component="Responsive" />
        <example :component="FluidContainer" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import Example from '@/playground/pages/core/grid/index.vue';
import Offset from '@/playground/pages/core/grid/offset.vue';
import OffsetReset from '@/playground/pages/core/grid/offset-reset.vue';
import PushPull from '@/playground/pages/core/grid/push-pull.vue';
import AutoWidth from '@/playground/pages/core/grid/auto-width.vue';
import Nested from '@/playground/pages/core/grid/nested.vue';
import HorizontalAlignmentStart from '@/playground/pages/core/grid/horizontal-alignment-start.vue';
import HorizontalAlignmentCenter from '@/playground/pages/core/grid/horizontal-alignment-center.vue';
import HorizontalAlignmentEnd from '@/playground/pages/core/grid/horizontal-alignment-end.vue';
import VerticalAlignmentTop from '@/playground/pages/core/grid/vertical-alignment-top.vue';
import VerticalAlignmentMiddle from '@/playground/pages/core/grid/vertical-alignment-middle.vue';
import VerticalAlignmentBottom from '@/playground/pages/core/grid/vertical-alignment-bottom.vue';
import DistributionAround from '@/playground/pages/core/grid/distribution-around.vue';
import DistributionBetween from '@/playground/pages/core/grid/distribution-between.vue';
import ReorderingReverse from '@/playground/pages/core/grid/reordering-reverse.vue';
import ReorderingFirst from '@/playground/pages/core/grid/reordering-first.vue';
import ReorderingLast from '@/playground/pages/core/grid/reordering-last.vue';
import Responsive from '@/playground/pages/core/grid/responsive.vue';
import FluidContainer from '@/playground/pages/core/grid/fluid-container.vue';

export default {
    setup() {
        return {
            Example: markRaw(Example),
            Offset: markRaw(Offset),
            OffsetReset: markRaw(OffsetReset),
            PushPull: markRaw(PushPull),
            AutoWidth: markRaw(AutoWidth),
            Nested: markRaw(Nested),
            HorizontalAlignmentStart: markRaw(HorizontalAlignmentStart),
            HorizontalAlignmentCenter: markRaw(HorizontalAlignmentCenter),
            HorizontalAlignmentEnd: markRaw(HorizontalAlignmentEnd),
            VerticalAlignmentTop: markRaw(VerticalAlignmentTop),
            VerticalAlignmentMiddle: markRaw(VerticalAlignmentMiddle),
            VerticalAlignmentBottom: markRaw(VerticalAlignmentBottom),
            DistributionAround: markRaw(DistributionAround),
            DistributionBetween: markRaw(DistributionBetween),
            ReorderingReverse: markRaw(ReorderingReverse),
            ReorderingFirst: markRaw(ReorderingFirst),
            ReorderingLast: markRaw(ReorderingLast),
            Responsive: markRaw(Responsive),
            FluidContainer: markRaw(FluidContainer),
        };
    }
}
</script>

<style lang="scss">
@import '../../../css/config';

#core-grid-page {
    .container {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
    }

    .column {
        margin-top: spacer('1-2');
        margin-bottom: spacer('1-2');
        text-align: center;

        &::after {
            content: '';
            width: 100%;
            display: block;
            box-sizing: border-box;
            text-align: center;
            border-radius: border-radius();
            padding: 1.25rem 0.5rem;
            color: #fff;
            background: color('primary');
        }
    }
}

#nested-example {
    .container > .row > .column {
        &::after {
            display: none;
        }

        &:first-child {
            border-right: 1px solid color('white');
        }

        border-radius: border-radius('lg');
        padding: spacer() 0;
        background: color('primary-20')
    }
}
</style>
