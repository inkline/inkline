<script lang="ts">
import { defineComponent } from 'vue';
import { ModalKey } from '@inkline/types';
import { useInjectStrict } from '@inkline/composables';
import { Icon } from '@inkline/component-icon';

const componentName = 'ModalClose';

export default defineComponent({
    name: componentName,
    components: {
        Icon
    },
    props: {
        /**
         * The aria-label attribute of the close button
         * @param {string} closeAriaLabel
         * @default Close
         */
        closeAriaLabel: {
            type: String,
            default: 'Close'
        }
    },
    setup() {
        const modal = useInjectStrict(ModalKey);

        return {
            hide: modal.hide
        };
    }
});
</script>
<template>
    <button class="modal-close" aria-hidden="true" :aria-label="closeAriaLabel" @click="hide">
        <!-- @slot close Close button slot -->
        <slot>
            <Icon name="ink:close" />
        </slot>
    </button>
</template>
