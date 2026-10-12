<script setup lang="ts">
// This app.vue replaces the Docus one, so docs pages mount the Docus shell
// (header, sidebar, search) themselves. The homepage brings its own, and
// doesn't load this one.
const DocusApp = defineAsyncComponent(() => import("docus/app/app.vue"));

const route = useRoute();
const usesDocus = computed(() => route.path === "/docs" || route.path.startsWith("/docs/"));

useHead({
  titleTemplate: (title) => (title ? `${title} - Inkline` : "Inkline"),
});
</script>

<template>
  <NuxtRouteAnnouncer />
  <DocusApp v-if="usesDocus" />
  <NuxtPage v-else />
</template>
