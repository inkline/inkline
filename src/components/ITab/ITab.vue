<script lang="ts">
import { defineComponent } from 'vue';
import { uid } from '@grozav/utils';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default tab content
 * @name default
 * @kind slot
 */

const componentName = 'ITab';

export default defineComponent({
    name: componentName,
    inject: {
        tabs: {
            default: () => ({})
        }
    },
    props: {
        /**
         * The title of the tab
         * @type String
         * @default
         * @name title
         */
        title: {
            type: String,
            default: ''
        },
        /**
         * The name of the tab, used as an identifier
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: String,
            default (): string {
                return uid('tab');
            }
        }
    },
    computed: {
        active (): boolean {
            return (this as any).tabs.active === this.name;
        },
        classes (): Classes {
            return {
                '-active': this.active
            };
        }
    }
});
</script>

<template>
    <div
        class="tab"
        :class="classes"
        v-show="active"
        role="tabpanel"
        :name="name"
        :aria-hidden="!active"
        :aria-labelledby="`tab-heading-${name}`"
    >
        <div class="tab-body">
            <slot />
        </div>
    </div>
</template>