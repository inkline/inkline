<script lang="ts" setup>
import {defineComponent, toRef} from 'vue';
import {
    LinkableMixin
} from '@inkline/inkline/mixins';
import {useLinkable} from "@inkline/inkline/composables";

/**
 * Slot for default navbar brand content
 * @name default
 * @kind slot
 */

const componentName = 'INavbarBrand';

const props = defineProps({
    /**
     * Renders the component as an anchor link with a `href` attribute
     * @type String
     * @default undefined
     * @name to
     */
    href: {
        type: String,
        default: undefined
    },
    /**
     * Set the HTML tag to be used for rendering the nav item
     * @type String
     * @default div
     * @name tag
     */
    tag: {
        type: String,
        default: 'div'
    },
    /**
     * Renders the component as a Router Link component with a `to` attribute
     * @type String
     * @default undefined
     * @name to
     */
    to: {
        type: [String, Object],
        default: undefined
    }
});

const to = toRef(props, 'to');
const href = toRef(props, 'href');
const currentTag = toRef(props, 'tag');
const { tag } = useLinkable({ to, href, tag: currentTag });
</script>

<template>
    <component :is="tag" class="navbar-brand" :tag="tag" translate="no">
        <!-- @slot default Slot for default navbar brand content -->
        <slot />
    </component>
</template>
