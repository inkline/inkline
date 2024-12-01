<script lang="ts">
import { computed, defineComponent, toRef } from 'vue';
import { useLinkable } from '@inkline/inkline/composables';

const componentName = 'NavbarBrand';

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
        const tag = toRef(props, 'tag');
        const { tag: renderTag } = useLinkable({ to, href, tag: tag });

        const bindings = computed(() => ({
            ...attrs,
            ...(to.value ? { to: to.value } : href.value ? { href: href.value } : {})
        }));

        return {
            bindings,
            renderTag
        };
    }
});
</script>

<template>
    <component v-bind="bindings" :is="renderTag" :tag="tag" class="navbar-brand" translate="no">
        <!-- @slot default Slot for default navbar brand content -->
        <slot />
    </component>
</template>
