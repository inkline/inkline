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
    <NumberInput v-model="value" :precision="2" placeholder="Enter a number.." />
</template>
