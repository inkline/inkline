<script>
export default {
    data() {
        return {
            value: ''
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
