<script lang="ts">
import { computed, defineComponent, toRef } from 'vue';
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
    setup(props, { attrs }) {
        const to = toRef(props, 'to');
        const href = toRef(props, 'href');
        const currentTag = toRef(props, 'tag');
        const { tag } = useLinkable({ to, href, tag: currentTag });

        const bindings = computed(() => ({
            ...attrs,
            ...(to.value ? { to: to.value } : href.value ? { href: href.value } : {})
        }));

        return {
            bindings,
            currentTag,
            tag
        };
    }
});
</script>

<template>
    <component v-bind="bindings" :is="tag" :tag="currentTag" class="navbar-brand" translate="no">
        <!-- @slot default Slot for default navbar brand content -->
        <slot />
    </component>
</template>
