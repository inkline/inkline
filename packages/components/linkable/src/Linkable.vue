<script lang="ts">
import { Component, PropType, resolveComponent } from 'vue';
import { computed, defineComponent } from 'vue';
import { useOptions } from '@inkline/composables';

const componentName = 'Linkable';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The active state of the button
         * @type Boolean
         * @default false
         * @name active
         */
        active: {
            type: Boolean,
            default: false
        },
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
         * Set the HTML tag to be used for rendering the button
         * @type String
         * @default button
         * @name tag
         */
        tag: {
            type: String,
            default: 'button'
        },
        /**
         * Renders the component as a Router Link component with a `to` attribute
         * @type String
         * @default undefined
         * @name to
         */
        to: {
            type: [String, Object] as PropType<string | object>,
            default: undefined
        }
    },
    setup(props) {
        const { options } = useOptions();

        const isRouterLink = computed(() => {
            return props.to;
        });

        const isLink = computed(() => {
            return props.href;
        });

        const renderTag = computed(() => {
            if (props.href) {
                return 'a';
            } else {
                return props.tag;
            }
        });

        const renderComponent = computed(() => {
            const routerComponent = options.value.routerComponent;
            if (props.to && routerComponent) {
                if (typeof routerComponent === 'string') {
                    return resolveComponent(routerComponent) as Component;
                } else {
                    return routerComponent;
                }
            }
        });

        return {
            isRouterLink,
            isLink,
            renderComponent,
            renderTag
        };
    }
});
</script>

<template>
    <Component v-if="isRouterLink" v-bind="$attrs" :is="renderComponent" :tag="renderTag" :to="to">
        <slot />
    </Component>
    <a v-else-if="isLink" v-bind="$attrs" :href="href">
        <slot />
    </a>
    <button v-else-if="renderTag === 'button'" v-bind="$attrs">
        <slot />
    </button>
    <Component v-else v-bind="$attrs" :is="renderTag">
        <slot />
    </Component>
</template>
