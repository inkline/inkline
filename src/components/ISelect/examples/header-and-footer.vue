<script>
export default {
    data() {
        return {
            selected: null,
            options: [
                { id: 1, label: 'Richard Hendricks' },
                { id: 2, label: 'Bertram Gilfoyle' },
                { id: 3, label: 'Dinesh Chugtai' },
                { id: 4, label: 'Jared Dunn' },
                { id: 5, label: 'Erlich Bachman' }
            ]
        };
    }
};
</script>
<template>
    <ISelect v-model="selected" :options="options" placeholder="Choose something..">
        <template #header> Header </template>
        <template #footer> Footer </template>
    </ISelect>
</template>
