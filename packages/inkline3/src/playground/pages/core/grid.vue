<template>
    <article id="core-grid-page">
        <h1>Grid</h1>

        <example :component="Index" />
        <example :component="Offset" />
        <example :component="OffsetReset" />
        <example :component="PushPull" />
        <example :component="AutoWidth" />
        <example id="nested-example" :component="Nested" />
        <example :component="HorizontalAlignmentStart" />
        <example :component="HorizontalAlignmentCenter" />
        <example :component="HorizontalAlignmentEnd" />
        <example class="vertical-alignment-example" :component="VerticalAlignmentTop" />
        <example class="vertical-alignment-example" :component="VerticalAlignmentMiddle" />
        <example class="vertical-alignment-example" :component="VerticalAlignmentBottom" />
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
import Index from '@inkline/inkline/src/components/IContainer/examples/index.vue';
import Offset from '@inkline/inkline/src/components/IColumn/examples/offset.vue';
import OffsetReset from '@inkline/inkline/src/components/IColumn/examples/offset-reset.vue';
import PushPull from '@inkline/inkline/src/components/IColumn/examples/push-pull.vue';
import AutoWidth from '@inkline/inkline/src/components/IColumn/examples/auto-width.vue';
import Nested from '@inkline/inkline/src/components/IColumn/examples/nested.vue';
import HorizontalAlignmentStart from '@inkline/inkline/src/components/IRow/examples/horizontal-alignment-start.vue';
import HorizontalAlignmentCenter from '@inkline/inkline/src/components/IRow/examples/horizontal-alignment-center.vue';
import HorizontalAlignmentEnd from '@inkline/inkline/src/components/IRow/examples/horizontal-alignment-end.vue';
import VerticalAlignmentTop from '@inkline/inkline/src/components/IRow/examples/vertical-alignment-top.vue';
import VerticalAlignmentMiddle from '@inkline/inkline/src/components/IRow/examples/vertical-alignment-middle.vue';
import VerticalAlignmentBottom from '@inkline/inkline/src/components/IRow/examples/vertical-alignment-bottom.vue';
import DistributionAround from '@inkline/inkline/src/components/IRow/examples/distribution-around.vue';
import DistributionBetween from '@inkline/inkline/src/components/IRow/examples/distribution-between.vue';
import ReorderingReverse from '@inkline/inkline/src/components/IRow/examples/reordering-reverse.vue';
import ReorderingFirst from '@inkline/inkline/src/components/IColumn/examples/reordering-first.vue';
import ReorderingLast from '@inkline/inkline/src/components/IColumn/examples/reordering-last.vue';
import Responsive from '@inkline/inkline/src/components/IColumn/examples/responsive.vue';
import FluidContainer from '@inkline/inkline/src/components/IContainer/examples/fluid-container.vue';

export default {
    setup() {
        return {
            Index: markRaw(Index),
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

    .vertical-alignment-example {
        .container > .row > .column {
            &:first-of-type {
                &::after {
                    padding: 3rem 0.5rem;
                }
            }
        }
    }
}
</style>
