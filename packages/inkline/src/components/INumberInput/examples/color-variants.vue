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
    <INumberInput v-model="value" color="light" placeholder="Enter a number.." />

    <INumberInput v-model="value" color="dark" placeholder="Enter a number.." />
</template>
