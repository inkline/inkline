<script lang="ts">
import { defineComponent } from 'vue';
import { uid } from '@grozav/utils';
import { IExpandTransition } from '@inkline/inkline/transitions';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default collapsible item content
 * @name default
 * @kind slot
 */

/**
 * Slot for collapsible item header content
 * @name header
 * @kind slot
 */

const componentName = 'ICollapsibleItem';

export default defineComponent({
    name: componentName,
    components: {
        IExpandTransition
    },
    inject: {
        collapsible: {
            default: () => ({
                activeItems: []
            })
        }
    },
    props: {
        /**
         * The unique identifier of the collapsible item, used for determining if the item is open or not
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: String,
            default () {
                return uid('collapsible-item');
            }
        },
        /**
         * The title of the collapsible item
         * @type String
         * @default
         * @name title
         */
        title: {
            type: String,
            default: ''
        }
    },
    computed: {
        active (): boolean {
            return (this as any).collapsible.activeItems.indexOf(this.name) > -1;
        },
        classes (): Classes {
            return {
                '-active': this.active
            };
        }
    },
    methods: {
        onClick () {
            (this as any).collapsible.onItemClick(this);
        }
    }
});
</script>

<template>
    <div
        class="collapsible-item"
        :class="classes"
        :name="name"
        tabindex="0"
        @click="onClick"
        @keydown.prevent.enter="onClick"
    >
        <a
            :id="`collapsible-item-heading-${name}`"
            class="collapsible-header"
            role="tab"
            :aria-expanded="active ? 'true' : 'false'"
            :aria-controls="`collapsible-item-content-${name}`"
            :aria-describedby="`collapsible-item-content-${name}`"
        >
            <slot name="header"> {{ title }} </slot>
            <i class="icon" />
        </a>
        <i-expand-transition>
            <div
                v-show="active"
                :id="`collapsible-item-content-${name}`"
                class="collapsible-body"
                role="tabpanel"
                :aria-hidden="active ? 'false' : 'true'"
                :aria-labelledby="`collapsible-item-heading-${name}`"
            >
                <div class="content">
                    <slot />
                </div>
            </div>
        </i-expand-transition>
    </div>
</template>
