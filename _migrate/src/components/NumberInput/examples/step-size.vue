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
    <NumberInput v-model="value" :step="10" placeholder="Enter a number.." />
</template>
