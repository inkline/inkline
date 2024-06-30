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
        <template #prefix>@</template>
    </INumberInput>

    <INumberInput v-model="value" placeholder="Enter a number..">
        <template #suffix>@</template>
    </INumberInput>

    <INumberInput v-model="value" placeholder="Enter a number..">
        <template #prefix>@</template>
        <template #suffix>@</template>
    </INumberInput>
</template>
