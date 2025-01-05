<script lang="ts" setup>
import { useData } from 'vitepress';
import { DefaultLayout, DocsLayout, Error404Layout } from './layouts';

const { page, frontmatter } = useData();
</script>
<template>
    <main>
        <Error404Layout v-if="page.isNotFound">Custom 404 page!</Error404Layout>
        <DocsLayout v-if="frontmatter.layout === 'docs'" />
        <DefaultLayout v-else />
    </main>
</template>
