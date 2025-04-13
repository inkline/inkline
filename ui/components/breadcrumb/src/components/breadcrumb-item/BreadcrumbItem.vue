<script lang="ts">
import { computed, defineComponent, markRaw, type PropType } from 'vue';
import { Linkable } from '@inkline/component-linkable';
import { toVariantList } from '@inkline/variants';
import { BaseComponent } from '@inkline/component-base';

const componentName = 'BreadcrumbItem';

export default defineComponent({
    name: componentName,
    components: {
        BaseComponent,
        Linkable
    },
    props: {
        /**
         * The active state of the breadcrumb item
         * @param {boolean} active
         * @default false
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the breadcrumb item
         * @param {boolean} disabled
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         *
         * @param {string} to
         * @default undefined
         */
        href: {
            type: String,
            default: undefined
        },
        /**
         * The tabindex of the breadcrumb item
         * @param {number | string} tabindex
         * @default 0
         */
        tabindex: {
            type: [Number, String],
            default: 0
        },
        /**
         * Set the HTML tag to be used for rendering the breadcrumb item
         * @param {string} tag
         * @default a
         */
        tag: {
            type: String,
            default: 'a'
        },
        /**
         *
         * @param {string} to
         * @default undefined
         */
        to: {
            type: [String, Object],
            default: undefined
        },
        /**
         * The variant of the alert
         * @param {string} variant
         * @default 'info'
         */
        variant: {
            type: [String, Array] as PropType<string | string[]>,
            default: undefined
        }
    },
    setup(props) {
        const variantList = computed(() => toVariantList(props.variant));
        const variants = computed(() => [
            'breadcrumb-item',
            ...(props.active ? ['breadcrumb-item--active'] : []),
            ...(props.disabled ? ['breadcrumb-item--disabled'] : []),
            ...variantList.value
        ]);

        const tabIndex = computed(() => (props.disabled || props.active ? -1 : props.tabindex));

        return {
            variants,
            tabIndex,
            component: markRaw(Linkable)
        };
    }
});
</script>

<template>
    <BaseComponent
        class="breadcrumb-item"
        :to="to"
        :href="href"
        :component="component"
        :tag="tag"
        :tabindex="tabIndex"
        :aria-disabled="disabled"
        :data-disabled="disabled"
        :aria-current="active && 'location'"
        :data-active="active"
        :variant="variants"
        role="menuitem"
    >
        <!-- @slot default Slot for default breadcrumb item content -->
        <slot />
    </BaseComponent>
</template>
`
