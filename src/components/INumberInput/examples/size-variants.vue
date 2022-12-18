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
    <INumberInput v-model="value" size="sm" placeholder="Enter a number.." />

    <INumberInput v-model="value" size="md" placeholder="Enter a number.." />

    <INumberInput v-model="value" size="lg" placeholder="Enter a number.." />
</template>
