<script>
export default {
    data() {
        return {
            selected: null,
            options: [
                { id: 1, name: 'Richard Hendricks' },
                { id: 2, name: 'Bertram Gilfoyle' },
                { id: 3, name: 'Dinesh Chugtai' },
                { id: 4, name: 'Jared Dunn' },
                { id: 5, name: 'Erlich Bachman' }
            ]
        };
    }
};
</script>
<template>
    <ISelect v-model="selected" :options="options" label="name" placeholder="Choose something..">
        <template #prepend>
            <span>I choose</span>
        </template>
    </ISelect>

    <ISelect v-model="selected" :options="options" label="name" placeholder="Choose something..">
        <template #append>
            <span>as an example</span>
        </template>
    </ISelect>

    <ISelect v-model="selected" :options="options" label="name" placeholder="Choose something..">
        <template #prepend>
            <span>I choose</span>
        </template>
        <template #append>
            <span>as an example</span>
        </template>
    </ISelect>
</template>
