<script>
export default {
    data() {
        return {
            active: 'tab-1'
        };
    }
};
</script>
<template>
    <Tabs v-model="active">
        <template #header>
            <TabTitle for="tab-1"> Tab 1 </TabTitle>
            <TabTitle for="tab-2"> Tab 2 </TabTitle>
            <TabTitle for="tab-3"> Tab 3 </TabTitle>
        </template>

        <Tab name="tab-1"> Tab 1 content </Tab>
        <Tab name="tab-2"> Tab 2 content </Tab>
        <Tab name="tab-3"> Tab 3 content </Tab>
    </Tabs>
</template>
