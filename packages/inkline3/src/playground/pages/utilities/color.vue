<template>
    <article>
        <h1>Color Utilities</h1>

        <example type="color-utilities" :component="BrandBackgroundExample" />
        <example type="color-utilities" :component="BrandTextExample" />

        <example type="color-utilities" :component="StateBackgroundExample" />
        <example type="color-utilities" :component="StateTextExample" />

        <example type="color-utilities" :component="BasicBackgroundExample" />
        <example type="color-utilities" :component="BasicTextExample" />

        <example type="color-utilities" :component="BasicRedBackgroundExample" />
        <example type="color-utilities" :component="BasicRedTextExample" />
        <example type="color-utilities" :component="BasicOrangeBackgroundExample" />
        <example type="color-utilities" :component="BasicOrangeTextExample" />
        <example type="color-utilities" :component="BasicYellowBackgroundExample" />
        <example type="color-utilities" :component="BasicYellowTextExample" />
        <example type="color-utilities" :component="BasicGreenBackgroundExample" />
        <example type="color-utilities" :component="BasicGreenTextExample" />
        <example type="color-utilities" :component="BasicTealBackgroundExample" />
        <example type="color-utilities" :component="BasicTealTextExample" />
        <example type="color-utilities" :component="BasicBlueBackgroundExample" />
        <example type="color-utilities" :component="BasicBlueTextExample" />
        <example type="color-utilities" :component="BasicPurpleBackgroundExample" />
        <example type="color-utilities" :component="BasicPurpleTextExample" />
        <example type="color-utilities" :component="BasicPinkBackgroundExample" />
        <example type="color-utilities" :component="BasicPinkTextExample" />

        <example type="color-utilities" :component="NeutralBackgroundExample" />
        <example type="color-utilities" :component="NeutralTextExample" />

        <example type="color-utilities" :component="SocialBackgroundExample" />
        <example type="color-utilities" :component="SocialTextExample" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import BrandBackgroundExample from '@inkline/inkline/src/playground/pages/utilities/color/brand-background.vue';
import BrandTextExample from '@inkline/inkline/src/playground/pages/utilities/color/brand-text.vue';

import StateBackgroundExample from '@inkline/inkline/src/playground/pages/utilities/color/state-background.vue';
import StateTextExample from '@inkline/inkline/src/playground/pages/utilities/color/state-text.vue';

import BasicBackgroundExample from '@inkline/inkline/src/playground/pages/utilities/color/basic-background.vue';
import BasicTextExample from '@inkline/inkline/src/playground/pages/utilities/color/basic-text.vue';

import BasicRedBackgroundExample from '@inkline/inkline/src/playground/pages/utilities/color/basic-red-background.vue';
import BasicRedTextExample from '@inkline/inkline/src/playground/pages/utilities/color/basic-red-text.vue';
import BasicOrangeBackgroundExample from '@inkline/inkline/src/playground/pages/utilities/color/basic-orange-background.vue';
import BasicOrangeTextExample from '@inkline/inkline/src/playground/pages/utilities/color/basic-orange-text.vue';
import BasicYellowBackgroundExample from '@inkline/inkline/src/playground/pages/utilities/color/basic-yellow-background.vue';
import BasicYellowTextExample from '@inkline/inkline/src/playground/pages/utilities/color/basic-yellow-text.vue';
import BasicGreenBackgroundExample from '@inkline/inkline/src/playground/pages/utilities/color/basic-green-background.vue';
import BasicGreenTextExample from '@inkline/inkline/src/playground/pages/utilities/color/basic-green-text.vue';
import BasicTealBackgroundExample from '@inkline/inkline/src/playground/pages/utilities/color/basic-teal-background.vue';
import BasicTealTextExample from '@inkline/inkline/src/playground/pages/utilities/color/basic-teal-text.vue';
import BasicBlueBackgroundExample from '@inkline/inkline/src/playground/pages/utilities/color/basic-blue-background.vue';
import BasicBlueTextExample from '@inkline/inkline/src/playground/pages/utilities/color/basic-blue-text.vue';
import BasicPurpleBackgroundExample from '@inkline/inkline/src/playground/pages/utilities/color/basic-purple-background.vue';
import BasicPurpleTextExample from '@inkline/inkline/src/playground/pages/utilities/color/basic-purple-text.vue';
import BasicPinkBackgroundExample from '@inkline/inkline/src/playground/pages/utilities/color/basic-pink-background.vue';
import BasicPinkTextExample from '@inkline/inkline/src/playground/pages/utilities/color/basic-pink-text.vue';

import NeutralBackgroundExample from '@inkline/inkline/src/playground/pages/utilities/color/neutral-background.vue';
import NeutralTextExample from '@inkline/inkline/src/playground/pages/utilities/color/neutral-text.vue';

import SocialBackgroundExample from '@inkline/inkline/src/playground/pages/utilities/color/social-background.vue';
import SocialTextExample from '@inkline/inkline/src/playground/pages/utilities/color/social-text.vue';

export default {
    setup() {
        return {
            BrandBackgroundExample: markRaw(BrandBackgroundExample),
            BrandTextExample: markRaw(BrandTextExample),

            StateBackgroundExample: markRaw(StateBackgroundExample),
            StateTextExample: markRaw(StateTextExample),

            BasicBackgroundExample: markRaw(BasicBackgroundExample),
            BasicTextExample: markRaw(BasicTextExample),

            BasicRedBackgroundExample: markRaw(BasicRedBackgroundExample),
            BasicRedTextExample: markRaw(BasicRedTextExample),
            BasicOrangeBackgroundExample: markRaw(BasicOrangeBackgroundExample),
            BasicOrangeTextExample: markRaw(BasicOrangeTextExample),
            BasicYellowBackgroundExample: markRaw(BasicYellowBackgroundExample),
            BasicYellowTextExample: markRaw(BasicYellowTextExample),
            BasicGreenBackgroundExample: markRaw(BasicGreenBackgroundExample),
            BasicGreenTextExample: markRaw(BasicGreenTextExample),
            BasicTealBackgroundExample: markRaw(BasicTealBackgroundExample),
            BasicTealTextExample: markRaw(BasicTealTextExample),
            BasicBlueBackgroundExample: markRaw(BasicBlueBackgroundExample),
            BasicBlueTextExample: markRaw(BasicBlueTextExample),
            BasicPurpleBackgroundExample: markRaw(BasicPurpleBackgroundExample),
            BasicPurpleTextExample: markRaw(BasicPurpleTextExample),
            BasicPinkBackgroundExample: markRaw(BasicPinkBackgroundExample),
            BasicPinkTextExample: markRaw(BasicPinkTextExample),

            NeutralBackgroundExample: markRaw(NeutralBackgroundExample),
            NeutralTextExample: markRaw(NeutralTextExample),

            SocialBackgroundExample: markRaw(SocialBackgroundExample),
            SocialTextExample: markRaw(SocialTextExample),
        };
    }
}
</script>
