<script lang="ts">
import { ref, computed, defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { AppTableColumn } from '~/types';
import type { ComponentManifest, ComponentManifestProp } from 'inkline';

export default defineComponent({
    props: {
        additionalProps: {
            type: Array as PropType<ComponentManifestProp[]>,
            default: () => []
        },
        manifest: {
            type: Object as PropType<ComponentManifest>,
            required: true
        }
    },
    setup(props) {
        const componentProps = computed(() => props.manifest.props || []);

        const columns = ref<AppTableColumn[]>([
            { label: 'Property', key: 'name', type: 'code', width: 4 },
            { label: 'Type', key: 'type', type: 'code', width: 4 },
            { label: 'Default', key: 'default', type: 'code', width: 4 },
            { label: '', key: 'description' }
        ]);

        const resolvedComponentProps = computed(() =>
            [...props.additionalProps, ...componentProps.value].sort((a, b) =>
                a.name.localeCompare(b.name)
            )
        );

        return {
            componentProps,
            resolvedComponentProps,
            columns
        };
    }
});
</script>

<template>
    <AppTable :rows="resolvedComponentProps" :columns="columns" />
</template>
