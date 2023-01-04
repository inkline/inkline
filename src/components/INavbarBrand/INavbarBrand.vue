<script lang="ts">
import { defineComponent, toRef } from 'vue';
import { useLinkable } from '@inkline/inkline/composables';

const componentName = 'INavbarBrand';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
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
    },
    setup(props) {
        const to = toRef(props, 'to');
        const href = toRef(props, 'href');
        const currentTag = toRef(props, 'tag');
        const { tag } = useLinkable({ to, href, tag: currentTag });

        return {
            tag,
            currentTag
        };
    }
});
</script>

<template>
    <component
        v-bind="$attrs"
        :is="tag"
        class="navbar-brand"
        :to="to"
        :href="href"
        :tag="currentTag"
        translate="no"
    >
        <!-- @slot default Slot for default navbar brand content -->
        <slot />
    </component>
</template>
