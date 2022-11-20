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
    <i-number-input v-model="value" :precision="2" placeholder="Enter a number.." />
</template>
