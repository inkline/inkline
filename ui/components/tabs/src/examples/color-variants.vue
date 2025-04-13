<script lang="ts" setup>
import { ref } from 'vue';

const activeTab = ref('tab-1');
</script>

<template>
    <Tabs color="light" v-model="activeTab">
        <TabList>
            <Tab name="tab-1">Tab 1</Tab>
            <Tab name="tab-2">Tab 2</Tab>
            <Tab name="tab-3">Tab 3</Tab>
        </TabList>

        <TabPanel name="tab-1">Tab 1 content</TabPanel>
        <TabPanel name="tab-2">Tab 2 content</TabPanel>
        <TabPanel name="tab-3">Tab 3 content</TabPanel>
    </Tabs>

    <Tabs color="dark" v-model="activeTab">
        <TabList>
            <Tab name="tab-1">Tab 1</Tab>
            <Tab name="tab-2">Tab 2</Tab>
            <Tab name="tab-3">Tab 3</Tab>
        </TabList>

        <TabPanel name="tab-1">Tab 1 content</TabPanel>
        <TabPanel name="tab-2">Tab 2 content</TabPanel>
        <TabPanel name="tab-3">Tab 3 content</TabPanel>
    </Tabs>
</template>
