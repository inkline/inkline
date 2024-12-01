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
    <NumberInput v-model="value" color="light" placeholder="Enter a number.." />

    <NumberInput v-model="value" color="dark" placeholder="Enter a number.." />
</template>
