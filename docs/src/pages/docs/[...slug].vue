<script setup lang="ts">
const slug = useRoute().params.slug;
const routePath = `/docs/${Array.isArray(slug) ? slug.join('/') : slug}`;

const { data: page } = await useAsyncData(routePath, () =>
    queryCollection('content').path(routePath).first()
);

definePageMeta({
    layout: 'docs'
});

useSeoMeta({
    title: page.value?.title,
    description: page.value?.description
});
</script>

<template>
    <ContentRenderer v-if="page" :value="page" tag="article" />
    <AppError404 v-else />
</template>
