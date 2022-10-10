<script lang="ts" setup>
import { computed } from 'vue';
import { useLinkable } from '@inkline/inkline/composables';

// TODO: complete props descriptions
const props = defineProps({
    /**
     * The active state of the breadcrumb item
     * @type Boolean
     * @default false
     * @name active
     */
    active: {
        type: Boolean,
        default: false
    },
    /**
     * The disabled state of the breadcrumb item
     * @type Boolean
     * @default false
     * @name disabled
     */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     *
     * @type String
     * @default undefined
     * @name to
     */
    href: {
        type: String,
        default: undefined
    },
    /**
     * The tabindex of the breadcrumb item
     * @type Number | String
     * @default 0
     * @name tabindex
     */
    tabindex: {
        type: [Number, String],
        default: 0
    },
    /**
     * Set the HTML tag to be used for rendering the breadcrumb item
     * @name tag
     * @type String
     * @default a
     */
    tag: {
        type: String,
        default: 'a'
    },
    /**
     *
     * @type String
     * @default undefined
     * @name to
     */
    to: {
        type: [String, Object],
        default: undefined
    }
});

const { isRouterLink } = useLinkable({ to: props.to, href: props.href });

const classes = computed(() => ({
    '-active': props.active,
    '-disabled': props.disabled
}));

const tabIndex = computed(() => (props.disabled || props.active ? -1 : props.tabindex));
</script>

<template>
    <li class="breadcrumb-item" :class="classes">
        <component
            v-bind="$attrs"
            :is="isRouterLink ? 'a' : props.tag"
            :tabindex="tabIndex"
            :aria-current="active ? 'location' : undefined"
        >
            <!--** Slot for default breadcrumb item content -->
            <slot />
        </component>
    </li>
</template>
`
