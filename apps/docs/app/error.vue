<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

const code = props.error.statusCode ?? 500;
const notFound = code === 404;
const title = notFound ? "Page not found" : "Something went wrong";

useSeoMeta({
  title,
  description: title,
  robots: "noindex",
  // UxErrorPage paints dark, like the homepage (docs pages follow the color mode).
  themeColor: "#050507",
  colorScheme: "dark",
});

const goHome = (event: MouseEvent) => {
  event.preventDefault();
  void clearError({ redirect: "/" });
};
</script>

<template>
  <UxErrorPage
    :code="code"
    :title="title"
    :lead="notFound ? 'This page does not exist.' : 'Please try again in a moment.'"
    home-label="Back to Inkline"
    @home="goHome"
  />
</template>
