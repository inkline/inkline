<script setup lang="ts">
// Replaces Docus's, which is empty, to link the docs and GitHub from the
// header's right side, beside its buttons. Below 768px, the byline leaves them no
// room, so they're in the header's menu instead (AppHeaderBody).
const links = useHeaderLinks();
</script>

<template>
  <UNavigationMenu :items="links" class="hidden md:flex" />
</template>
