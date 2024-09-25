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
    <ITabs v-model="active" color="light">
        <template #header>
            <ITabTitle for="tab-1"> Tab 1 </ITabTitle>
            <ITabTitle for="tab-2"> Tab 2 </ITabTitle>
            <ITabTitle for="tab-3"> Tab 3 </ITabTitle>
        </template>

        <ITab name="tab-1"> Tab 1 content </ITab>
        <ITab name="tab-2"> Tab 2 content </ITab>
        <ITab name="tab-3"> Tab 3 content </ITab>
    </ITabs>

    <ITabs v-model="active" color="dark">
        <template #header>
            <ITabTitle for="tab-1"> Tab 1 </ITabTitle>
            <ITabTitle for="tab-2"> Tab 2 </ITabTitle>
            <ITabTitle for="tab-3"> Tab 3 </ITabTitle>
        </template>

        <ITab name="tab-1"> Tab 1 content </ITab>
        <ITab name="tab-2"> Tab 2 content </ITab>
        <ITab name="tab-3"> Tab 3 content </ITab>
    </ITabs>
</template>
