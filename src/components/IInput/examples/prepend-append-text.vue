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
            <span>https://</span>
        </template>
    </IInput>

    <IInput v-model="value" placeholder="Type something..">
        <template #append>
            <span>.com</span>
        </template>
    </IInput>

    <IInput v-model="value" placeholder="Type something..">
        <template #prepend>
            <span>https://</span>
        </template>
        <template #append>
            <span>.com</span>
        </template>
    </IInput>
</template>
