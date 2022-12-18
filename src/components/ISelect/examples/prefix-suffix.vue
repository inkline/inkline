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
    <i-select v-model="selected" :options="options" label="name" placeholder="Choose something..">
        <template #prefix>
            <span>@</span>
        </template>
    </i-select>

    <i-select v-model="selected" :options="options" label="name" placeholder="Choose something..">
        <template #suffix>
            <span>@</span>
        </template>
    </i-select>

    <i-select v-model="selected" :options="options" label="name" placeholder="Choose something..">
        <template #prefix>
            <span>@</span>
        </template>
        <template #suffix>
            <span>@</span>
        </template>
    </i-select>
</template>
