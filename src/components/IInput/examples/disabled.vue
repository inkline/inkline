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
    <i-input v-model="value" disabled placeholder="Type something.." />
</template>
