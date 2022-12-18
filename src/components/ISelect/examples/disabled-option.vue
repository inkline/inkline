<script>
export default {
    data() {
        return {
            selected: null,
            options: [
                { id: 1, label: 'Richard Hendricks' },
                { id: 2, label: 'Bertram Gilfoyle' },
                { id: 3, label: 'Dinesh Chugtai' },
                { id: 4, label: 'Jared Dunn', disabled: true },
                { id: 5, label: 'Erlich Bachman', disabled: true }
            ]
        };
    }
};
</script>
<template>
    <ISelect v-model="selected" :options="options" placeholder="Choose something.." />
</template>
