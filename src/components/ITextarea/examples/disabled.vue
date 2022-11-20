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
    <i-textarea v-model="value" disabled placeholder="Type something.." />
</template>
