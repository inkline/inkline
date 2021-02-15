<template>
    <article>
        <h1>Text Utilities</h1>
        <example :component="TextAlignExample" />
        <example :component="TextAlignJustifyExample" />
        <example :component="TextAlignResponsiveExample" />
        <example :component="TextWrapExample" />
        <example :component="TextNowrapExample" />
        <example :component="TextTruncateExample" />
        <example :component="TextBreakExample" />
        <example :component="TextTransformExample" />
        <example :component="FontWeightExample" />
        <example :component="FontWeightRelativeExample" />
        <example :component="FontStyleItalicExample" />
        <example :component="FontMonospaceExample" />
        <example :component="TextDecorationExample" />
        <example :component="TextMutedExample" />
        <example :component="TextResetExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import TextAlignExample from '@inkline/inkline/src/playground/pages/utilities/text/text-align.vue';
import TextAlignJustifyExample from '@inkline/inkline/src/playground/pages/utilities/text/text-align-justify.vue';
import TextAlignResponsiveExample from '@inkline/inkline/src/playground/pages/utilities/text/text-align-responsive.vue';
import TextWrapExample from '@inkline/inkline/src/playground/pages/utilities/text/text-wrap.vue';
import TextNowrapExample from '@inkline/inkline/src/playground/pages/utilities/text/text-nowrap.vue';
import TextTruncateExample from '@inkline/inkline/src/playground/pages/utilities/text/text-truncate.vue';
import TextBreakExample from '@inkline/inkline/src/playground/pages/utilities/text/text-break.vue';
import TextTransformExample from '@inkline/inkline/src/playground/pages/utilities/text/text-transform.vue';
import FontWeightExample from '@inkline/inkline/src/playground/pages/utilities/text/font-weight.vue';
import FontWeightRelativeExample from '@inkline/inkline/src/playground/pages/utilities/text/font-weight-relative.vue';
import FontStyleItalicExample from '@inkline/inkline/src/playground/pages/utilities/text/font-style-italic.vue';
import FontMonospaceExample from '@inkline/inkline/src/playground/pages/utilities/text/font-monospace.vue';
import TextDecorationExample from '@inkline/inkline/src/playground/pages/utilities/text/text-decoration.vue';
import TextMutedExample from '@inkline/inkline/src/playground/pages/utilities/text/text-muted.vue';
import TextResetExample from '@inkline/inkline/src/playground/pages/utilities/text/text-reset.vue';

export default {
    setup() {
        return {
            TextAlignExample: markRaw(TextAlignExample),
            TextAlignJustifyExample: markRaw(TextAlignJustifyExample),
            TextAlignResponsiveExample: markRaw(TextAlignResponsiveExample),
            TextWrapExample: markRaw(TextWrapExample),
            TextNowrapExample: markRaw(TextNowrapExample),
            TextTruncateExample: markRaw(TextTruncateExample),
            TextBreakExample: markRaw(TextBreakExample),
            TextTransformExample: markRaw(TextTransformExample),
            FontWeightExample: markRaw(FontWeightExample),
            FontWeightRelativeExample: markRaw(FontWeightRelativeExample),
            FontStyleItalicExample: markRaw(FontStyleItalicExample),
            FontMonospaceExample: markRaw(FontMonospaceExample),
            TextDecorationExample: markRaw(TextDecorationExample),
            TextMutedExample: markRaw(TextMutedExample),
            TextResetExample: markRaw(TextResetExample),
        };
    }
}
</script>
