<script lang="ts">
import { defineComponent } from 'vue';
import {
    LinkableMixin
} from '@inkline/inkline/mixins';

/**
 * Slot for default navbar brand content
 * @name default
 * @kind slot
 */

const componentName = 'INavbarBrand';

export default defineComponent({
    name: componentName,
    mixins: [
        LinkableMixin
    ],
    props: {
        /**
         * Set the HTML tag to be used for rendering the nav item
         * @type String
         * @default div
         * @name tag
         */
        tag: {
            type: String,
            default: 'div'
        }
    }
});
</script>

<template>
    <component class="navbar-brand" :is="isTag" :tag="tag" translate="no">
        <slot />
    </component>
</template>