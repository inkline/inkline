<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first());

useSeoMeta({
    title: home.value?.title,
    description: home.value?.description
});
</script>

<template>
    <ContentRenderer v-if="home" :value="home" />
    <AppError404 v-else />
</template>
