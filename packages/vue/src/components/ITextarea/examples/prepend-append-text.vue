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
            <span>https://</span>
        </template>
    </ITextarea>

    <ITextarea v-model="value" placeholder="Type something..">
        <template #append>
            <span>.com</span>
        </template>
    </ITextarea>

    <ITextarea v-model="value" placeholder="Type something..">
        <template #prepend>
            <span>https://</span>
        </template>
        <template #append>
            <span>.com</span>
        </template>
    </ITextarea>
</template>
