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
    <INumberInput v-model="value" placeholder="Enter a number..">
        <template #prepend>
            <span>https://</span>
        </template>
    </INumberInput>

    <INumberInput v-model="value" placeholder="Enter a number..">
        <template #append>
            <span>.com</span>
        </template>
    </INumberInput>

    <INumberInput v-model="value" placeholder="Enter a number..">
        <template #prepend>
            <span>https://</span>
        </template>
        <template #append>
            <span>.com</span>
        </template>
    </INumberInput>
</template>
