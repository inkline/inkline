<script>
export default {
    data() {
        return {
            value: 'This input is readonly.'
        };
    }
};
</script>
<template>
    <i-number-input v-model="value" readonly placeholder="Enter a number.." />
</template>
