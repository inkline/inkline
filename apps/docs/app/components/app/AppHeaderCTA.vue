<script setup lang="ts">
// Replaces Docus's, which is empty, to link the docs and GitHub, with the version
// select before GitHub, from the header's right side, beside its buttons. Below
// 768px, the byline leaves them no room, so they're in the header's menu instead
// (AppHeaderBody).
const links = useHeaderLinks();
// GitHub is the last link.
const pages = computed(() => links.value.slice(0, -1));
const github = computed(() => links.value.slice(-1));
</script>

<template>
  <UNavigationMenu :items="pages" class="hidden md:flex" />
  <AppVersionSelect class="hidden md:inline-flex" />
  <UNavigationMenu :items="github" class="hidden md:flex" />
</template>
