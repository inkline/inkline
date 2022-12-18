<script>
export default {
    data() {
        return {
            value: 10
        };
    }
};
</script>
<template>
    <INumberInput v-model="value" clearable placeholder="Enter a number.." />
</template>
