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
    <i-number-input v-model="value" color="light" placeholder="Enter a number.." />
    
    <i-number-input v-model="value" color="dark" placeholder="Enter a number.." />
</template>
