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
    <IInput v-model="value" placeholder="Type something..">
        <template #prepend>
            <IButton>Button</IButton>
        </template>
    </IInput>

    <IInput v-model="value" placeholder="Type something..">
        <template #append>
            <IButton>Button</IButton>
        </template>
    </IInput>

    <IInput v-model="value" placeholder="Type something..">
        <template #prepend>
            <IButton>Button</IButton>
        </template>
        <template #append>
            <IButton>Button</IButton>
        </template>
    </IInput>
</template>
