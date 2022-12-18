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
    <i-number-input v-model="value" readonly placeholder="Enter a number.." />
</template>
