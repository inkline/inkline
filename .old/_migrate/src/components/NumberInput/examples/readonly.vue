<script>
export default {
    data() {
        return {
            value: 10
        };
    }
};
</script>
<template>
    <NumberInput v-model="value" readonly placeholder="Enter a number.." />
</template>
