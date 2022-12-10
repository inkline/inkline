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
    <i-input v-model="value" placeholder="Type something..">
        <template #prepend>
            <i-button>Button</i-button>
        </template>
    </i-input>

    <i-input v-model="value" placeholder="Type something..">
        <template #append>
            <i-button>Button</i-button>
        </template>
    </i-input>

    <i-input v-model="value" placeholder="Type something..">
        <template #prepend>
            <i-button>Button</i-button>
        </template>
        <template #append>
            <i-button>Button</i-button>
        </template>
    </i-input>
</template>
