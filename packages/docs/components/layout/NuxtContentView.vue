<template>
    <article class="documentation-view">
        <h1>{{ page.title }}</h1>
        <h2 class="lead">
            {{ page.description }}
        </h2>
        <nuxt-content :document="page" />
    </article>
</template>

<style lang="scss">
    .documentation-view {
        .lead {
            line-height: 30px;
            margin-top: 1.25rem;
            margin-bottom: 1.25rem;
        }
    }
</style>

<script>
import View from './View';

export default {
    name: 'View',
    extends: View
};
</script>
