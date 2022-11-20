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
    <i-textarea v-model="value" color="light" placeholder="Type something.." />
    
    <i-textarea v-model="value" color="dark" placeholder="Type something.." />
</template>
