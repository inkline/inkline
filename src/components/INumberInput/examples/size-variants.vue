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
    <i-number-input v-model="value" size="sm" placeholder="Enter a number.." />

    <i-number-input v-model="value" size="md" placeholder="Enter a number.." />

    <i-number-input v-model="value" size="lg" placeholder="Enter a number.." />
</template>
