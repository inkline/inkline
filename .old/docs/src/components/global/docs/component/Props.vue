<script lang="ts" setup>
import { useManifest } from '~/composables';
import type { ComponentManifestProp } from 'inkline';

type Props = {
    package: string;
    component: string;
    additionalProps?: ComponentManifestProp[];
};

const props = withDefaults(defineProps<Props>(), {
    additionalProps: () => []
});

const { manifest } = useManifest(props.package, props.component);
</script>

<template>
    <ManifestProps v-if="manifest" :manifest="manifest" :additional-props="additionalProps" />
</template>
