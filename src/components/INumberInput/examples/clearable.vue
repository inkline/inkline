<script>
export default {
    data() {
        return {
            value: 'This input is clearable.'
        };
    }
};
</script>
<template>
    <i-number-input v-model="value" clearable placeholder="Enter a number.." />
</template>
