<script lang="ts">
import { defineComponent, computed, inject } from 'vue';
import { uid } from '@grozav/utils';
import { CollapsibleKey } from '@inkline/inkline/components/ICollapsible/mixin';
import { IExpandTransition } from '@inkline/inkline/components/IExpandTransition';

const componentName = 'ICollapsibleItem';

export default defineComponent({
    name: componentName,
    components: {
        IExpandTransition
    },
    inheritAttrs: false,
    props: {
        /**
         * The unique identifier of the collapsible item, used for determining if the item is open or not
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: String,
            default: () => {
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
    setup(props) {
        const collapsible = inject(CollapsibleKey, null);

        const active = computed(() => collapsible?.activeItems.value.includes(props.name));

        const classes = computed(() => ({
            '-active': active.value
        }));

        function onClick() {
            collapsible?.onItemClick(props.name);
        }

        return {
            active,
            classes,
            onClick
        };
    }
});
</script>

<template>
    <div v-bind="$attrs" class="collapsible-item" :class="classes" :name="name">
        <a
            :id="`collapsible-item-header-${name}`"
            class="collapsible-header"
            role="tab"
            :aria-expanded="active ? 'true' : 'false'"
            :aria-controls="`collapsible-item-content-${name}`"
            :aria-describedby="`collapsible-item-content-${name}`"
            tabindex="0"
            @click="onClick"
            @keydown.prevent.enter="onClick"
            @keydown.prevent.space="onClick"
        >
            <!-- @slot header Slot for collapsible item header content -->
            <slot name="header"> {{ title }} </slot>
            <i class="icon" />
        </a>
        <IExpandTransition>
            <div
                v-show="active"
                :id="`collapsible-item-body-${name}`"
                class="collapsible-body"
                role="tabpanel"
                :aria-hidden="active ? 'false' : 'true'"
                :aria-labelledby="`collapsible-item-header-${name}`"
            >
                <div class="content">
                    <!-- @slot default Slot for default collapsible item content -->
                    <slot />
                </div>
            </div>
        </IExpandTransition>
    </div>
</template>
