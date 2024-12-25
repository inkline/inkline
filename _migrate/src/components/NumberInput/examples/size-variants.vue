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
    <NumberInput v-model="value" size="sm" placeholder="Enter a number.." />

    <NumberInput v-model="value" size="md" placeholder="Enter a number.." />

    <NumberInput v-model="value" size="lg" placeholder="Enter a number.." />
</template>
