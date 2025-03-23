<script lang="ts" setup>
import { computed, ref } from 'vue';

const props = defineProps<{
    title?: string;
}>();

const slots = defineSlots<{
    preview(): any;
    config(): any;
    vite(): any;
    nuxt(): any;
    webpack(): any;
    main(): any;
    app(): any;
    vue(): any;
    code(): any;
    css(): any;
    output(): any;
    custom(): any;
}>();

const tabs = ref<
    Array<{
        name: keyof typeof slots;
        title?: string;
    }>
>([
    { name: 'preview', title: 'Preview' },
    { name: 'config', title: 'inkline.config.ts' },
    { name: 'vite', title: 'vite.config.ts' },
    { name: 'nuxt', title: 'nuxt.config.ts' },
    { name: 'webpack', title: 'webpack.config.js' },
    { name: 'main', title: 'main.ts' },
    { name: 'app', title: 'App.vue' },
    { name: 'vue', title: 'Component.vue' },
    { name: 'code', title: 'Code' },
    { name: 'css', title: 'style.css' },
    { name: 'output', title: 'Output' },
    { name: 'custom', title: props.title }
]);

const availableTabs = computed(() => tabs.value.filter((tab) => !!slots[tab.name]));

const active = ref(availableTabs.value[0].name);
</script>

<template>
    <Tabs v-model="active" class="docs-tabs">
        <TabList>
            <Tab v-for="tab in availableTabs" :key="tab.name" :name="tab.name">
                {{ tab.title }}
            </Tab>
        </TabList>

        <TabPanel v-for="tab in availableTabs" :key="tab.name" :name="tab.name">
            <slot :name="tab.name" />
        </TabPanel>
    </Tabs>
</template>

<style>
.docs-tabs {
    margin-bottom: var(--spacing);

    > .tab-list {
        margin-bottom: 0;
        border-bottom: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        .tab {
            min-width: 100px;
        }
    }

    > .tab-panel {
        border-top-left-radius: 0;
        border-top-right-radius: 0;

        > pre {
            margin: 0;
        }
    }
}
</style>
