<script>
export default {
    data() {
        return {
            value: 1
        };
    }
};
</script>
<template>
    <NumberInput v-model="value" :min="1" :max="10" placeholder="Enter a number.." />
</template>
