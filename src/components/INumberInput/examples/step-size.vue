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
    <i-number-input v-model="value" :step="10" placeholder="Enter a number.." />
</template>
