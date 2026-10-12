<script setup lang="ts">
// Replaces @uxfront/layer-docs's to start the header's menu with the
// Documentation and GitHub links below 768px, where AppHeaderCTA has no room
// for them beside the header's buttons. The rest is the layer's, which its package doesn't export:
// the Framework select, then Docus's navigation.
import DocusAppHeaderBody from "docus/app/components/app/AppHeaderBody.vue";

const links = useHeaderLinks();
const { frameworks } = useFramework();
const labelId = useId();
</script>

<template>
  <UNavigationMenu :items="links" orientation="vertical" class="mb-4 -mx-2.5 md:hidden" />
  <div v-if="frameworks.length">
    <span :id="labelId" class="w-full pr-2.5 py-1.5 flex items-center text-sm text-muted">
      Framework
    </span>
    <DocsFrameworkSelect :aria-labelledby="labelId" class="mb-2" />
  </div>
  <DocusAppHeaderBody />
</template>
