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
            <IButton>Button</IButton>
        </template>
    </INumberInput>

    <INumberInput v-model="value" placeholder="Enter a number..">
        <template #append>
            <IButton>Button</IButton>
        </template>
    </INumberInput>

    <INumberInput v-model="value" placeholder="Enter a number..">
        <template #prepend>
            <IButton>Button</IButton>
        </template>
        <template #append>
            <IButton>Button</IButton>
        </template>
    </INumberInput>
</template>
