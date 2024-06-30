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
    <ITextarea v-model="value" placeholder="Type something..">
        <template #prepend>
            <IButton>Button</IButton>
        </template>
    </ITextarea>

    <ITextarea v-model="value" placeholder="Type something..">
        <template #append>
            <IButton>Button</IButton>
        </template>
    </ITextarea>

    <ITextarea v-model="value" placeholder="Type something..">
        <template #prepend>
            <IButton>Button</IButton>
        </template>
        <template #append>
            <IButton>Button</IButton>
        </template>
    </ITextarea>
</template>
