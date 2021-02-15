<template>
    <article id="core-layout-page">
        <h1>Layout</h1>

        <example :component="ContentHeader" />
        <example :component="ContentHeaderFooter" />
        <example :component="ContentWithLeftAsideHeaderFooter" />
        <example :component="ContentWithRightAsideHeaderFooter" />
        <example :component="ContentWithLeftAndRightAsidesHeaderFooter" />
        <example :component="LeftAsideWithContentHeaderFooter" />
        <example :component="RightAsideWithContentHeaderFooter" />
        <example :component="LeftAndRightAsidesWithContentHeaderFooter" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import ContentHeader from '@inkline/inkline/src/components/ILayout/examples/content-header.vue';
import ContentHeaderFooter from '@inkline/inkline/src/components/ILayout/examples/content-header-footer.vue';
import ContentWithLeftAsideHeaderFooter from '@inkline/inkline/src/components/ILayout/examples/content-with-left-aside-header-footer.vue';
import ContentWithRightAsideHeaderFooter from '@inkline/inkline/src/components/ILayout/examples/content-with-right-aside-header-footer.vue';
import ContentWithLeftAndRightAsidesHeaderFooter from '@inkline/inkline/src/components/ILayout/examples/content-with-left-and-right-asides-header-footer.vue';
import LeftAsideWithContentHeaderFooter from '@inkline/inkline/src/components/ILayout/examples/left-aside-with-content-header-footer.vue';
import RightAsideWithContentHeaderFooter from '@inkline/inkline/src/components/ILayout/examples/right-aside-with-content-header-footer.vue';
import LeftAndRightAsidesWithContentHeaderFooter from '@inkline/inkline/src/components/ILayout/examples/left-and-right-asides-with-content-header-footer.vue';

export default {
    setup() {
        return {
            ContentHeader: markRaw(ContentHeader),
            ContentHeaderFooter: markRaw(ContentHeaderFooter),
            ContentWithLeftAsideHeaderFooter: markRaw(ContentWithLeftAsideHeaderFooter),
            ContentWithRightAsideHeaderFooter: markRaw(ContentWithRightAsideHeaderFooter),
            ContentWithLeftAndRightAsidesHeaderFooter: markRaw(ContentWithLeftAndRightAsidesHeaderFooter),
            LeftAsideWithContentHeaderFooter: markRaw(LeftAsideWithContentHeaderFooter),
            RightAsideWithContentHeaderFooter: markRaw(RightAsideWithContentHeaderFooter),
            LeftAndRightAsidesWithContentHeaderFooter: markRaw(LeftAndRightAsidesWithContentHeaderFooter),
        };
    }
}
</script>
