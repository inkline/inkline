<template>
    <article>
        <h1>Typography</h1>

        <example :component="Index" />
        <example :component="Headings" />
        <example :component="HeadingHelpers" />
        <example :component="Displays" />
        <example :component="Lead" />
        <example :component="InlineTextElements" />
        <example :component="TextAlignment" />
        <example :component="TextWrapping" />
        <example :component="ResponsiveUtilities" />
        <example :component="Abbreviations" />
        <example :component="Blockquotes" />
        <example :component="UnorderedList" />
        <example :component="OrderedList" />
        <example :component="UnstyledList" />
        <example :component="InlineList" />
        <example :component="DescriptionList" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import Index from '@/playground/pages/core/typography/index.vue';
import Headings from '@/playground/pages/core/typography/headings.vue';
import HeadingHelpers from '@/playground/pages/core/typography/heading-helpers.vue';
import Displays from '@/playground/pages/core/typography/displays.vue';
import Lead from '@/playground/pages/core/typography/lead.vue';
import InlineTextElements from '@/playground/pages/core/typography/inline-text-elements.vue';
import TextAlignment from '@/playground/pages/core/typography/text-alignment.vue';
import TextWrapping from '@/playground/pages/core/typography/text-wrapping.vue';
import ResponsiveUtilities from '@/playground/pages/core/typography/responsive-utilities.vue';
import Abbreviations from '@/playground/pages/core/typography/abbreviations.vue';
import Blockquotes from '@/playground/pages/core/typography/blockquotes.vue';
import UnorderedList from '@/playground/pages/core/typography/unordered-list.vue';
import OrderedList from '@/playground/pages/core/typography/ordered-list.vue';
import UnstyledList from '@/playground/pages/core/typography/unstyled-list.vue';
import InlineList from '@/playground/pages/core/typography/inline-list.vue';
import DescriptionList from '@/playground/pages/core/typography/description-list.vue';

export default {
    setup() {
        return {
            Index: markRaw(Index),
            Headings: markRaw(Headings),
            HeadingHelpers: markRaw(HeadingHelpers),
            Displays: markRaw(Displays),
            Lead: markRaw(Lead),
            InlineTextElements: markRaw(InlineTextElements),
            TextAlignment: markRaw(TextAlignment),
            TextWrapping: markRaw(TextWrapping),
            ResponsiveUtilities: markRaw(ResponsiveUtilities),
            Abbreviations: markRaw(Abbreviations),
            Blockquotes: markRaw(Blockquotes),
            UnorderedList: markRaw(UnorderedList),
            OrderedList: markRaw(OrderedList),
            UnstyledList: markRaw(UnstyledList),
            InlineList: markRaw(InlineList),
            DescriptionList: markRaw(DescriptionList),
        };
    }
}
</script>
