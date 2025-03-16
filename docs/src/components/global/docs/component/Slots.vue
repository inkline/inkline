<script lang="ts" setup>
import { useManifest } from '~/composables';

type Props = {
    package: string;
    component: string;
};

const props = withDefaults(defineProps<Props>(), {});

const { manifest } = useManifest(props.package, props.component);
</script>

<template>
    <ManifestSlots v-if="manifest" :manifest="manifest" />
</template>
