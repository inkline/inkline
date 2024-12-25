<script lang="ts">
import { Component, PropType, resolveComponent } from 'vue';
import { computed, defineComponent } from 'vue';
import { useOptions } from '@inkline/composables';

const componentName = 'Linkable';

export default defineComponent({
    name: componentName,
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
         * Set the HTML tag to be used for rendering the linkable
         * @type String
         * @default button
         * @name tag
         */
        tag: {
            type: String,
            default: 'a'
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
            const routerComponent = options.value.router?.component;
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
    <Component
        v-if="isRouterLink"
        v-bind="$attrs"
        :is="renderComponent"
        :tag="renderTag"
        :to="to"
        role="link"
    >
        <slot />
    </Component>
    <a v-else-if="isLink" v-bind="$attrs" :href="href" role="link">
        <slot />
    </a>
    <button v-else-if="renderTag === 'button'" v-bind="$attrs" role="link">
        <slot />
    </button>
    <input v-else-if="renderTag === 'input'" v-bind="$attrs" type="button" role="link" />
    <Component v-else v-bind="$attrs" :is="renderTag" role="link">
        <slot />
    </Component>
</template>
