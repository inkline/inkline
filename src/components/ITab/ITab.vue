<script lang="ts">
import { computed, defineComponent, inject, onBeforeUnmount, onBeforeMount, onMounted } from 'vue';
import { uid } from '@grozav/utils';
import { TabsKey } from '@inkline/inkline/components/ITabs/mixin';

const componentName = 'ITab';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
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
            default(): string {
                return uid('tab');
            }
        }
    },
    setup(props) {
        const tabs = inject(TabsKey, null);

        const active = computed(() => tabs?.active.value === props.name);
        const classes = computed(() => ({
            '-active': active.value
        }));

        onMounted(() => {
            tabs?.synchronize();
        });

        onBeforeUnmount(() => {
            tabs?.synchronize();
        });

        return {
            active,
            classes
        };
    }
});
</script>

<template>
    <div
        v-show="active"
        v-bind="$attrs"
        class="tab"
        :class="classes"
        role="tabpanel"
        :name="name"
        :title="title"
        :aria-hidden="!active"
        :aria-labelledby="`tab-heading-${name}`"
    >
        <div class="tab-body">
            <!-- @slot default Slot for tab content -->
            <slot />
        </div>
    </div>
</template>
