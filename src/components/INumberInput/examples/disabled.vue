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
    <i-number-input v-model="value" disabled placeholder="Enter a number.." />
</template>
