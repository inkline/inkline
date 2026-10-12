<script setup lang="ts">
// Picks the documented version: this site is v5, and picking another opens its
// site in the same tab. Reka's select commits only when an option is clicked or
// chosen with Enter or Space; arrowing through the open list only highlights. A
// native <select> would fire `change` on each arrow key on Windows and Linux.
// The list is at least as wide as its labels: the trigger alone is too narrow.
import { VERSIONS } from "~/data/versions";

const current = VERSIONS[0].label;
const items = VERSIONS.map(({ label }) => label);

function go(label: string) {
  const url = VERSIONS.find((version) => version.label === label)?.url;
  if (url) navigateTo(url, { external: true });
}
</script>

<template>
  <USelect
    :model-value="current"
    :items="items"
    aria-label="Version"
    variant="ghost"
    color="neutral"
    :ui="{ content: 'min-w-fit' }"
    @update:model-value="go"
  />
</template>
