<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
    props: {
        color: {
            type: String,
            default: 'info'
        }
    },
    setup(props) {
        const icon = computed(() => {
            switch (props.color) {
                case 'success':
                    return 'ink:check';
                case 'warning':
                    return 'ink:warning';
                case 'danger':
                    return 'ink:danger';
                default:
                    return 'ink:info';
            }
        });

        return {
            icon
        };
    }
});
</script>

<template>
    <Alert class="docs-alert" :color="color">
        <template #icon>
            <Icon :name="icon" />
        </template>
        <slot mdc-unwrap="p" />
    </Alert>
</template>

<style>
.docs-alert {
    margin-bottom: var(--spacing);
}
</style>
