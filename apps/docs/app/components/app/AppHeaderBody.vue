<script setup lang="ts">
// Replaces @uxfront/layer-docs's to start the header's menu with the
// Documentation and GitHub links below 768px, where AppHeaderCTA has no room
// for them beside the header's buttons. The rest is the layer's, which its package doesn't export:
// the Framework select, then Docus's navigation. The Version select sits beside the
// Framework one, in the same indent, and shows below 768px only, like the links.
import DocusAppHeaderBody from "docus/app/components/app/AppHeaderBody.vue";

const links = useHeaderLinks();
const { frameworks } = useFramework();
const labelId = useId();
const versionLabelId = useId();
</script>

<template>
  <UNavigationMenu :items="links" orientation="vertical" class="mb-4 -mx-2.5 md:hidden" />
  <div v-if="frameworks.length">
    <span :id="labelId" class="w-full pr-2.5 py-1.5 flex items-center text-sm text-muted">
      Framework
    </span>
    <DocsFrameworkSelect :aria-labelledby="labelId" class="mb-2" />
  </div>
  <div class="md:hidden">
    <span :id="versionLabelId" class="w-full pr-2.5 py-1.5 flex items-center text-sm text-muted">
      Version
    </span>
    <div class="mb-2 ms-2.5 -me-2.5 border-s border-default">
      <div class="ps-1.5 -ms-px">
        <AppVersionSelect :aria-labelledby="versionLabelId" class="w-full" />
      </div>
    </div>
  </div>
  <DocusAppHeaderBody />
</template>
