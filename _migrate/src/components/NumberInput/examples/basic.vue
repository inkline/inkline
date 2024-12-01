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
    <NumberInput v-model="value" placeholder="Enter a number.." />
</template>
