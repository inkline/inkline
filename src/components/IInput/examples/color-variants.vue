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
    <i-input v-model="value" color="light" placeholder="Type something.." />
    
    <i-input v-model="value" color="dark" placeholder="Type something.." />
</template>
